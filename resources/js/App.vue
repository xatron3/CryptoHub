<template>
  <div
    class="h-screen w-screen flex bg-gray-200 dark:bg-gray-800"
    v-if="loaded"
  >
    <Navigation v-if="hasUser"></Navigation>
    <div class="w-full">
      <HeaderBar v-if="hasUser"></HeaderBar>
      <router-view class="p-4"></router-view>
    </div>
  </div>
  <div v-else>Loading....</div>
</template>

<script>
import Navigation from "./layout/navigation/Index.vue";
import HeaderBar from "./layout/header-bar/Index.vue";
import { getUser } from "./services/auth";

export default {
  data() {
    return {
      title: "Test",
      loaded: false,
    };
  },
  components: {
    Navigation,
    HeaderBar,
  },
  computed: {
    hasUser() {
      return (
        this.$store.state.user !== null && this.$store.state.user !== false
      );
    },
  },
  async beforeMount() {
    if (localStorage.getItem("access_token")) {
      let res = await getUser();

      if (res !== undefined) {
        this.$store.commit("setUser", res.data);
        this.loaded = true;
      } else {
        localStorage.removeItem("access_token");
        this.$router.push("/");
      }
    } else {
      this.loaded = true;
    }
  },
};
</script>
