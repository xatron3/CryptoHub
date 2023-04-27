<template>
  <div class="h-10 flex-row flex items-center px-3 dark:bg-gray-700">
    <div class="block md:hidden">
      <span @click="this.$store.commit('app/toggleNavigation')"
        ><Bars3Icon class="h-6 dark:text-white text-black"
      /></span>
    </div>

    <div class="ml-auto relative">
      <div class="flex flex-row space-x-2">
        <UserCircleIcon
          class="h-6 cursor-pointer dark:text-gray-200"
          @click="showDropDown"
        />
      </div>

      <Transition>
        <div
          class="absolute right-0 top-8 shadow-md rounded-md bg-gray-100 dark:bg-gray-800 z-50 p-2 w-52 text-center"
          v-if="this._showDropDown"
        >
          <div class="flex flex-col space-y-1 pb-2">
            <div class="w-full font-bold dark:text-white">
              {{ this.$store.state.user.info.name }}
            </div>

            <router-link
              to="/"
              @click="_showDropDown = false"
              class="dark:text-white"
            >
              Home
            </router-link>

            <router-link
              to="/profile/settings"
              @click="_showDropDown = false"
              class="dark:text-white"
            >
              Settings
            </router-link>

            <Button title="Darkmode" @click="darkMode()" />
          </div>

          <div
            class="w-full cursor-pointer border-t pt-2 pb-1 dark:text-white"
            @click="logout"
          >
            Logout
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script>
import {
  ArrowRightOnRectangleIcon,
  UserCircleIcon,
  Bars3Icon,
} from "@heroicons/vue/24/outline";

import UpdateCoingecko from "@/pages/Admin/Commands/commands/update-coingecko.vue";

import { Transition } from "vue";

export default {
  name: "HeaderBar",
  components: {
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
    Transition,
    Bars3Icon,
    UpdateCoingecko,
  },
  data() {
    return {
      _showDropDown: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$store.commit("user/setUser", {});
      this.$router.push({ name: "Home" });
    },
    showDropDown() {
      this._showDropDown = !this._showDropDown;
    },
    darkMode() {
      const darkMode = localStorage.getItem("darkMode");
      const root = document.getElementsByTagName("html")[0];

      if (darkMode === "true") {
        localStorage.setItem("darkMode", false);
        root.removeAttribute("class", "dark");
      } else {
        localStorage.setItem("darkMode", true);
        root.setAttribute("class", "dark");
      }
    },
  },
};
</script>
