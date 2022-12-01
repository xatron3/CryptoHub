<template>
  <nav class="bg-gray-200 dark:bg-gray-700 p-6 shadow-lg">
    <div class="flex items-center justify-between flex-wrap max-w-6xl mx-auto">
      <router-link
        to="/"
        class="flex items-center flex-shrink-0 text-white mr-6"
      >
        <img :src="this.logo" class="w-8 mr-2" />
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
      <div
        class="w-full block flex-grow lg:flex lg:items-center lg:w-auto"
        v-if="this.showNav"
      >
        <div class="lg:flex-grow">
          <router-link
            to="/swap"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 dark:hover:text-gray-200 mr-4 transition-all"
          >
            Swap
          </router-link>
          <router-link
            to="/cyclop-token"
            class="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-gray-500 dark:hover:text-gray-200 mr-4 transition-all"
          >
            Cyclop Token
          </router-link>
        </div>
        <div class="space-x-2 flex items-center">
          <div>
            <div v-if="!this.$store.getters['web3/wallet']">
              <button
                @click="walletConnect"
                class="inline-block text-sm px-4 py-2 leading-none transition-all border rounded text-white border-white hover:bg-gray-100 dark:hover:bg-gray-900 mt-4 lg:mt-0"
              >
                Connect Wallet
              </button>
            </div>
            <div class="flex items-center space-x-2" v-else>
              <div>{{ this.$store.getters["web3/chainId"] }}</div>

              <div
                class="w-28 overflow-hidden rounded-lg bg-gray-400 text-white dark:bg-gray-800 px-4 py-2 text-sm text-ellipsis"
              >
                <span class="overflow-hidden">{{
                  this.$store.getters["web3/wallet"]
                }}</span>
              </div>
            </div>
          </div>

          <div>
            <router-link
              v-if="!this.$store.getters['user/loggedIn']"
              to="/login"
              class="text-sm flex items-center px-4 py-2 leading-none transition-all border rounded text-white border-white hover:bg-gray-100 dark:hover:bg-gray-900 mt-4 lg:mt-0"
              >Login</router-link
            >
            <router-link
              v-if="this.$store.getters['user/loggedIn']"
              to="/dashboard"
              class="text-sm flex items-center px-4 py-2 leading-none transition-all border rounded text-white border-white hover:bg-gray-100 dark:hover:bg-gray-900 mt-4 lg:mt-0"
              >Dashboard</router-link
            >
          </div>

          <div @click="toggleDarkMode()">
            <MoonIcon
              class="w-5 h-5 cursor-pointer text-white dark:text-gray-900"
              v-if="this.darkMode === 'true'"
            />
            <SunIcon
              class="w-5 h-5 cursor-pointer text-white dark:text-gray-900"
              v-if="this.darkMode !== 'true'"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

import Logo from "../../../../../images/logo.png";

export default {
  name: "Navbar",
  components: {
    MoonIcon,
    SunIcon,
  },
  data() {
    return {
      showNav: true,
      logo: "",
      darkMode: "",
    };
  },
  mounted() {
    this.logo = Logo;
    this.darkMode = localStorage.getItem("darkMode");
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
    toggleDarkMode() {
      const root = document.getElementsByTagName("html")[0];

      if (this.darkMode === "true") {
        localStorage.setItem("darkMode", false);
        root.removeAttribute("class", "dark");
      } else {
        localStorage.setItem("darkMode", true);
        root.setAttribute("class", "dark");
      }

      this.darkMode = localStorage.getItem("darkMode");
    },
  },
};
</script>

<style></style>
