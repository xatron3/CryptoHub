<template>
  <div class="flex flex-col">
    <div class="max-w-6xl w-full mx-auto">
      <h2 class="text-2xl font-bold my-3">Swap Token</h2>
      <div class="w-full max-w-md bg-gray-600 mx-auto p-2 rounded-md">
        <div
          @click="updateUi"
          title=""
          class="mb-2 ml-auto w-8 h-8 bg-green-500 rounded-lg p-1"
        >
          <ArrowPathIcon v-if="this.tokenDataLoaded" />
          <ArrowPathIcon v-if="!this.tokenDataLoaded" class="animate-spin" />
        </div>

        <div v-if="this.tokenDataLoaded" class="flex flex-col w-full">
          <div class="space-y-2">
            <div class="bg-gray-700 p-2 rounded-lg space-y-1">
              <div class="text-sm">Sell</div>
              <Input
                :showLabel="false"
                :value="this.sellData.amount"
                v-model="this.sellData.amount"
                @keyup="sellAmountChange"
              />
              <div class="flex justify-between items-center">
                <div class="uppercase font-bold text-xs">Balance</div>
                <div
                  class="text-xs"
                  @click="this.sellData.amount = this.sellData.balance"
                >
                  {{ `${this.sellData.balance} ${this.sellData.symbol}` }}
                </div>
              </div>
            </div>

            <!-- BUY INFO -->
            <div class="bg-gray-700 p-2 rounded-lg space-y-1">
              <div class="text-sm">Buy</div>
              <Input
                :showLabel="false"
                :value="this.buyData.amount"
                v-model="this.buyData.amount"
                :disabled="true"
              />
              <div class="flex justify-between items-center">
                <div class="uppercase font-bold text-xs">Balance</div>
                <div
                  class="text-xs"
                  @click="this.sellData.amount = this.sellData.balance"
                >
                  {{ `${this.buyData.balance} ${this.buyData.symbol}` }}
                </div>
              </div>
            </div>
          </div>
          <div
            @click="swap"
            title="Swap"
            class="mt-2 bg-green-500 text-white hover:bg-green-600 transition-all px-3 py-2 rounded-md flex justify-center"
          >
            <div v-if="!this.swapping">Swap</div>
            <ArrowPathIcon v-if="this.swapping" class="animate-spin w-6" />
          </div>
        </div>
        <div v-else class="w-full text-center">Loading data</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import { ArrowPathIcon } from "@heroicons/vue/24/outline";

import { getQuote } from "@/helpers/web3.js";

import ERC20ABI from "@/helpers/abis/ERC20.js";

export default {
  name: "Swap",
  data() {
    return {
      tokenDataLoaded: false,
      swapping: false,
      sellData: {
        amount: 1,
        balance: 0,
        decimals: 0,
        symbol: "",
      },
      buyData: {
        amount: 0,
        balance: 0,
        decimals: 0,
        symbol: "",
      },
      swapData: {
        sellAmount: 100000,
        sellAddr: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
        sellDecimals: 0,
        buyAddr: "0x74b23882a30290451A17c44f4F05243b6b58C76d", // ETH: 0x74b23882a30290451A17c44f4F05243b6b58C76d | USDC: 0x04068DA6C83AFCFA0e13ba15A6696662335D5B75 | CRV: 0x1E4F97b9f9F913c46F1632781732927B9019C68b
        buyDecimals: 0,
      },
    };
  },
  components: { ArrowPathIcon },
  async mounted() {
    await this.updateUi();
  },
  methods: {
    async sellAmountChange() {
      const sellWeiNumber = ethers.utils.parseUnits(
        this.sellData.amount.toString(),
        this.sellData.decimals
      );

      this.swapData.sellAmount = sellWeiNumber;

      const buyAmount = await getQuote(this.swapData);
      this.buyData.amount = buyAmount;
    },
    async updateUi() {
      this.tokenDataLoaded = false;
      const buyTokenContract = new ethers.Contract(
        this.swapData.buyAddr,
        ERC20ABI,
        this.$store.getters["web3/provider"].getSigner()
      );

      const sellTokenContract = new ethers.Contract(
        this.swapData.sellAddr,
        ERC20ABI,
        this.$store.getters["web3/provider"].getSigner()
      );

      const buyData = await this.loadTokenData(buyTokenContract);
      this.buyData.balance = parseFloat(buyData.balance).toFixed(2);
      this.buyData.decimals = buyData.decimals;
      this.buyData.symbol = buyData.symbol;

      const sellData = await this.loadTokenData(sellTokenContract);
      this.sellData.balance = parseFloat(sellData.balance).toFixed(2);
      this.sellData.decimals = sellData.decimals;
      this.sellData.symbol = sellData.symbol;

      this.swapData.buyDecimals = buyData.decimals;

      await this.sellAmountChange();

      this.tokenDataLoaded = true;
    },
    async loadTokenData(contract) {
      let data = {};

      data.decimals = await contract.decimals();
      data.symbol = await contract.symbol();

      data.balance = await contract.balanceOf(
        this.$store.getters["web3/wallet"]
      );

      data.balance = ethers.utils.formatUnits(data.balance, data.decimals);

      return data;
    },
    async swap() {
      this.swapping = true;

      const sellWeiNumber = ethers.utils.parseUnits(
        this.sellData.amount.toString(),
        this.sellData.decimals
      );

      const ZERO_EX_ADDRESS = "0xdef189deaef76e379df891899eb5a00a94cbc250";
      const sellTokenContract = new ethers.Contract(
        this.swapData.sellAddr,
        ERC20ABI,
        this.$store.getters["web3/provider"].getSigner()
      );
      const currentAllowance = await sellTokenContract.allowance(
        this.$store.getters["web3/wallet"],
        ZERO_EX_ADDRESS
      );

      if (ethers.BigNumber.from(currentAllowance).toNumber() < sellWeiNumber) {
        this.swapping = false;
        await sellTokenContract.approve(ZERO_EX_ADDRESS, sellWeiNumber * 1.05);
      } else {
        const response = await fetch(
          `https://fantom.api.0x.org/swap/v1/quote?buyToken=${this.swapData.buy}&sellToken=${this.swapData.sell}&sellAmount=${sellWeiNumber}&takerAddress=${this.$store.getters["web3/wallet"]}&feeRecipient=0xc7BF7E22eD98404dE1802d0d0d1844BE21394685&buyTokenPercentageFee=0.01`
        );

        const quote = await response.json();
        console.log(quote);
        const params = {
          from: quote.from,
          to: quote.to,
          data: quote.data,
          value: quote.value,
          gas: quote.gas,
          gasPrice: quote.gasPrice,
        };
        this.swapping = false;
        this.provider.send("eth_sendTransaction", [params]);
      }
    },
  },
};
</script>
