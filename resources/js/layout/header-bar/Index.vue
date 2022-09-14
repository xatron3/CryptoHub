<template>
  <div class="h-14 bg-gray-100 shadow-sm flex-row flex items-center px-3">
    <div class="ml-auto relative">
      <div class="flex flex-row space-x-2">
        <UserCircleIcon class="h-6 cursor-pointer" @click="showDropDown" />
      </div>

      <Transition>
        <div
          class="absolute right-0 top-8 shadow-md rounded-md bg-gray-100 z-50 p-2 w-52"
          v-if="this._showDropDown"
        >
          <div class="w-full text-center py-2 font-bold">
            {{ this.$store.state.user.name }}
          </div>

          <div
            class="w-full cursor-pointer text-center border-t pt-2 pb-1"
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
} from "@heroicons/vue/24/outline";

import { Transition } from "vue";

export default {
  name: "HeaderBar",
  components: {
    ArrowRightOnRectangleIcon,
    UserCircleIcon,
    Transition,
  },
  data() {
    return {
      _showDropDown: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("access_token");
      this.$store.commit("setUser", null);
      this.$router.push({ name: "Login" });
    },
    showDropDown() {
      this._showDropDown = !this._showDropDown;
    },
  },
};
</script>
