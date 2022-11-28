<template>
  <div
    class="min-h-screen w-full flex bg-gray-50 dark:bg-gray-800"
    v-if="
      this.$store.state.app.viewType === 'public' &&
      this.$store.getters['app/isLoaded']
    "
  >
    <div class="w-full">
      <Navbar />
      <router-view></router-view>
    </div>
  </div>

  <div
    class="min-h-screen w-full flex bg-gray-50 dark:bg-gray-800"
    v-if="
      this.$store.state.app.viewType === 'authed' &&
      this.$store.getters['app/isLoaded']
    "
  >
    <Navigation v-if="this.$store.getters['user/loggedIn']"></Navigation>
    <div class="w-full">
      <HeaderBar v-if="this.$store.getters['user/loggedIn']"></HeaderBar>
      <router-view class="p-4"></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "@/pages/Public/components/Navbar/navbar.vue";

import Navigation from "./layout/navigation/Index.vue";
import HeaderBar from "./layout/header-bar/Index.vue";

export default {
  data() {
    return {
      title: "Test",
      loaded: false,
    };
  },
  components: {
    Navbar,
    Navigation,
    HeaderBar,
  },
  async beforeMount() {
    if (localStorage.getItem("access_token")) {
      await this.$store.dispatch("app/loadAppData");
    } else {
      this.$store.commit("app/setLoaded", true);
    }
  },
};
</script>
