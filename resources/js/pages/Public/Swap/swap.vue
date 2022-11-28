<template>
  <div class="flex flex-col">
    <div class="max-w-6xl w-full mx-auto">
      <h2 class="text-2xl font-bold my-3">Latest News</h2>
      <div class="w-full max-w-md bg-gray-600 mx-auto p-2 rounded-md">
        <Button @click="updateUi" title="R" class="mb-2 self-end" />
        <div v-if="this.tokenDataLoaded" class="flex flex-col w-full">
          <div class="space-y-2">
            <div class="bg-gray-700 p-2 rounded-lg">
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
            <div class="bg-gray-700 p-2 rounded-lg">
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
          <Button @click="swap" title="Swap" class="mt-2" />
        </div>
        <div v-else class="w-full text-center">Loading data</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ethers } from "ethers";
import { mapState } from "vuex";

import ERC20ABI from "@/helpers/abis/ERC20.js";

export default {
  name: "Swap",
  data() {
    return {
      tokenDataLoaded: false,
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
        sell: "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75",
        buy: "0x74b23882a30290451A17c44f4F05243b6b58C76d",
      },
    };
  },
  components: {},
  async mounted() {
    await this.updateUi();
  },
  methods: {
    async sellAmountChange() {
      const sellAmount = this.sellData.amount;

      const response = await fetch(
        `https://fantom.api.0x.org/swap/v1/quote?buyToken=${this.swapData.buy}&sellToken=${this.swapData.sell}&sellAmount=${sellAmount}&feeRecipient=0xc7BF7E22eD98404dE1802d0d0d1844BE21394685&buyTokenPercentageFee=0.01`
      );

      const data = await response.json();
      console.log(data);

      const ordersLength = data.orders.length;

      const buyAmount = ethers.utils.formatUnits(
        data.orders[ordersLength - 1].makerAmount,
        this.buyData.decimals
      );

      this.buyData.amount = buyAmount;
    },
    async updateUi() {
      this.tokenDataLoaded = false;
      const buyTokenContract = new ethers.Contract(
        this.swapData.buy,
        ERC20ABI,
        this.$store.getters["web3/provider"].getSigner()
      );

      const sellTokenContract = new ethers.Contract(
        this.swapData.sell,
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
      const amount = 100000;
      const ZERO_EX_ADDRESS = "0xdef189deaef76e379df891899eb5a00a94cbc250";

      this.updateUi();

      const currentAllowance = await sellTokenContract.allowance(
        this.$store.getters["web3/wallet"],
        ZERO_EX_ADDRESS
      );

      if (ethers.BigNumber.from(currentAllowance).toNumber() < amount) {
        await sellTokenContract.approve(ZERO_EX_ADDRESS, amount);
      } else {
        const response = await fetch(
          `https://fantom.api.0x.org/swap/v1/quote?buyToken=${this.swapData.buy}&sellToken=${this.swapData.sell}&sellAmount=${amount}&takerAddress=${this.$store.getters["web3/wallet"]}&feeRecipient=0xc7BF7E22eD98404dE1802d0d0d1844BE21394685&buyTokenPercentageFee=0.01`
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

        this.provider.send("eth_sendTransaction", [params]);
      }
    },
  },
};
</script>