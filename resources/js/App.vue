<template>
  <div class="min-h-screen w-full flex bg-gray-200 dark:bg-gray-800">
    <Navigation v-if="hasUser"></Navigation>
    <div class="w-full">
      <HeaderBar v-if="hasUser"></HeaderBar>
      <router-view class="p-4"></router-view>
    </div>
  </div>
</template>

<script>
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
      this.$store.dispatch("getUser").then(() => {});
    }
  },
};
</script>
