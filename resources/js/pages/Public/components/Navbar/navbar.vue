<template>
  <nav class="bg-gray-700 p-6 shadow-lg">
    <div class="flex items-center justify-between flex-wrap max-w-6xl mx-auto">
      <router-link
        to="/"
        class="flex items-center flex-shrink-0 text-white mr-6"
      >
        <img src="/storage/favicon50x50.png" class="w-8 mr-2" />
        <span class="font-semibold text-xl tracking-tight">MarketCyclop</span>
      </router-link>
      <div class="block lg:hidden">
        <button
          class="flex items-center px-3 py-2 border rounded text-white border-gray-400 hover:text-gray-200 hover:border-white"
          @click="this.showNav = !this.showNav"
        >
          <svg
            class="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <router-link
            to="/swap"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4"
          >
            Swap
          </router-link>

          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4"
          >
            Latest News
          </a>
          <a
            href="#responsive-header"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-200 mr-4"
          >
            Cyclop Token
          </a>
        </div>
        <div class="space-x-2 flex">
          <div>
            <div v-if="!this.$store.getters['web3/wallet']">
              <button
                @click="walletConnect"
                class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Connect Wallet
              </button>
            </div>
            <div v-else>
              <div
                class="w-28 overflow-hidden rounded-lg bg-gray-800 px-4 py-2 text-sm text-ellipsis"
              >
                <span class="overflow-hidden">{{
                  this.$store.getters["web3/wallet"]
                }}</span>
              </div>
            </div>
          </div>
          <router-link
            to="/login"
            class="text-sm flex items-center px-4 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
            >Login</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { ethers } from "ethers";
export default {
  name: "Navbar",
  data() {
    return {
      showNav: false,
    };
  },
  methods: {
    async walletConnect() {
      if (window.ethereum) {
        await this.$store.getters["web3/provider"].send(
          "eth_requestAccounts",
          []
        );

        const signer = this.$store.getters["web3/provider"].getSigner();
        const address = await signer.getAddress();
        this.$store.dispatch("web3/setWallet", address);
      }
    },
  },
};
</script>

<style></style>
