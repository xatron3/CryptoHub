<template>
  <div>
    <div
      @click="showLogin = true"
      v-if="!this.$store.getters['user/loggedIn']"
      class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
    >
      Login
    </div>
    <router-link
      v-if="this.$store.getters['user/loggedIn']"
      to="/dashboard"
      class="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
      >Dashboard</router-link
    >
  </div>

  <LoginModal :show="showLogin" @hideModal="showLogin = false" />
</template>

<script>
import LoginModal from "./login-modal.vue";

export default {
  components: {
    LoginModal,
  },
  data() {
    return {
      showLogin: false,
    };
  },
};
</script>
