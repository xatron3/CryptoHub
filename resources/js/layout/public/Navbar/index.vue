<template>
  <nav class="bg-gray-200 dark:bg-gray-600 shadow-lg">
    <div
      class="flex items-center justify-between flex-wrap max-w-6xl mx-auto h-24"
    >
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
        <div class="lg:flex-grow space-x-8">
          <router-link
            to="/swap"
            class="inline-flex items-center pt-1 font-medium text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 hover:text-gray-600 focus:outline-none transition duration-150 ease-in-out"
          >
            Swap
          </router-link>
          <router-link
            to="/cyclop-token"
            class="inline-flex items-center pt-1 font-medium text-gray-800 dark:text-gray-300 dark:hover:text-gray-200 hover:text-gray-600 focus:outline-none transition duration-150 ease-in-out"
          >
            Cyclop Token
          </router-link>
        </div>
        <div class="space-x-2 flex items-center">
          <WalletConnect />

          <Login />

          <div
            @click="toggleDarkMode()"
            class="dark:hover:bg-gray-800 hover:bg-gray-100 p-2 rounded-md transition duration-150 ease-in-out"
          >
            <MoonIcon
              class="w-4 h-4 cursor-pointer text-white dark:text-gray-900"
              v-if="this.darkMode === 'true'"
            />
            <SunIcon
              class="w-4 h-4 cursor-pointer text-white dark:text-gray-900"
              v-if="this.darkMode !== 'true'"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import WalletConnect from "./components/wallet-connect.vue";
import Login from "./components/login.vue";
import { MoonIcon, SunIcon } from "@heroicons/vue/24/solid";

import Logo from "../../../../images/logo.png";

export default {
  name: "Navbar",
  components: {
    MoonIcon,
    SunIcon,
    WalletConnect,
    Login,
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
