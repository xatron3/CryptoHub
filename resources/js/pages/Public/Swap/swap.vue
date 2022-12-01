<template>
  <div class="flex flex-col">
    <div class="max-w-6xl w-full mx-auto">
      <h2 class="text-2xl font-semibold my-3 uppercase h-font">Swap Token</h2>
      <div
        class="w-full max-w-md bg-gray-100 dark:bg-gray-600 mx-auto p-2 rounded-md"
      >
        <div
          @click="updateUi"
          title=""
          class="mb-2 ml-auto w-8 h-8 bg-green-500 rounded-lg p-1 text-white"
        >
          <ArrowPathIcon v-if="this.tokenDataLoaded" />
          <ArrowPathIcon v-if="!this.tokenDataLoaded" class="animate-spin" />
        </div>

        <div v-if="this.tokenDataLoaded" class="flex flex-col w-full">
          <!-- SELL INFO -->
          <div class="space-y-2">
            <div class="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg space-y-1">
              <div class="text-sm">Sell</div>
              <a
                :href="`https://ftmscan.com/address/${this.swapData.sellAddr}`"
                target="_BLANK"
                >{{ this.swapData.sellAddr }}</a
              >
              <Input
                :showLabel="false"
                :value="this.sellData.amount"
                v-model="this.sellData.amount"
                @keyup="sellAmountChange"
              />
              <div class="flex justify-between items-center">
                <div class="uppercase font-bold text-xs">Balance</div>
                <div class="text-xs" @click="setSellAmount()">
                  {{ `${this.sellData.balance} ${this.sellData.symbol}` }}
                </div>
              </div>
            </div>

            <div class="h-8 flex justify-center items-center">
              <ArrowsUpDownIcon @click="swapTokens()" class="h-6" />
            </div>

            <!-- BUY INFO -->
            <div class="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg space-y-1">
              <div class="text-sm">Buy</div>
              <a
                :href="`https://ftmscan.com/address/${this.swapData.buyAddr}`"
                target="_BLANK"
                >{{ this.swapData.buyAddr }}</a
              >
              <Input
                :showLabel="false"
                :value="this.buyData.amount"
                v-model="this.buyData.amount"
                :disabled="true"
              />
              <div class="flex justify-between items-center">
                <div class="uppercase font-bold text-xs">Balance</div>
                <div class="text-xs" @click="setSellAmount()">
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
import { ArrowPathIcon, ArrowsUpDownIcon } from "@heroicons/vue/24/outline";

import { getQuote, getContract } from "@/helpers/web3.js";

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
        sellContract: null,
        buyContract: null,
        sellAddr: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
        buyAddr: "0x74b23882a30290451A17c44f4F05243b6b58C76d", // ETH: 0x74b23882a30290451A17c44f4F05243b6b58C76d | USDC: 0x04068DA6C83AFCFA0e13ba15A6696662335D5B75 | CRV: 0x1E4F97b9f9F913c46F1632781732927B9019C68b
      },
    };
  },
  watch: {
    swapData() {
      console.log("d");
    },
  },
  components: { ArrowPathIcon, ArrowsUpDownIcon },
  async mounted() {
    await this.loadContracts();
    await this.updateUi();
  },
  methods: {
    async loadContracts() {
      this.swapData.buyContract = await getContract(this.swapData.buyAddr);
      this.swapData.sellContract = await getContract(this.swapData.sellAddr);
    },
    async swapTokens() {
      // Swap buy and sell token
      let _tmpBuy, _tmpSell;
      _tmpBuy = this.swapData.buyAddr;
      _tmpSell = this.swapData.sellAddr;
      this.swapData.buyAddr = _tmpSell;
      this.swapData.sellAddr = _tmpBuy;

      await this.loadContracts();
      await this.updateUi();
    },
    async setSellAmount() {
      this.sellData.amount = this.sellData.balance;
      await this.sellAmountChange();
    },
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

      const buyData = await this.loadTokenData(this.swapData.buyContract);
      this.buyData.balance = parseFloat(buyData.balance).toFixed(2);
      this.buyData.decimals = buyData.decimals;
      this.buyData.symbol = buyData.symbol;

      const sellData = await this.loadTokenData(this.swapData.sellContract);
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

      // 0x Swap Contract
      const ZERO_EX_ADDRESS = "0xdef189deaef76e379df891899eb5a00a94cbc250";

      // Get the sell amount
      const sellDecimals = await this.swapData.sellContract.decimals();

      const sellWeiNumber = ethers.utils.parseUnits(
        this.sellData.amount.toString(),
        sellDecimals
      );

      // Current allowance for the sell asset
      const currentAllowance = await this.swapData.sellContract.allowance(
        this.$store.getters["web3/wallet"],
        ZERO_EX_ADDRESS
      );

      // If current allowance is less then needed promt allowance
      if (ethers.BigNumber.from(currentAllowance).toNumber() < sellWeiNumber) {
        const res = await this.swapData.sellContract.approve(
          ZERO_EX_ADDRESS,
          sellWeiNumber * 1.05
        );
      } else {
        const response = await fetch(
          `https://fantom.api.0x.org/swap/v1/quote?buyToken=${this.swapData.buyAddr}&sellToken=${this.swapData.sellAddr}&sellAmount=${sellWeiNumber}&takerAddress=${this.$store.getters["web3/wallet"]}&feeRecipient=0xc7BF7E22eD98404dE1802d0d0d1844BE21394685&buyTokenPercentageFee=0.005`
        );

        const quote = await response.json();
        console.log(quote);
        const params = {
          from: quote.from,
          to: quote.to,
          data: quote.data,
          value: quote.value,
          gas: quote.gas,
          gasPrice: "1000000000",
        };
        this.swapping = false;
        this.$store.getters["web3/provider"].send("eth_sendTransaction", [
          params,
        ]);
      }
    },
  },
};
</script>
