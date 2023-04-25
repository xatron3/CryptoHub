<template>
  <!-- PUBLIC PAGE -->
  <div
    class="min-h-screen w-full flex bg-gray-50 dark:bg-gray-800"
    v-if="
      this.$store.state.app.viewType === 'public' &&
      this.$store.getters['app/isLoaded']
    "
  >
    <div class="w-full flex flex-col">
      <Navbar />

      <div class="max-w-6xl w-full mx-auto px-2 md:px-0 mb-auto">
        <router-view></router-view>
      </div>

      <Footer />
    </div>
  </div>

  <!-- ADMIN PAGE -->
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
import Navbar from "@/pages/Public/components/Navbar/index.vue";
import Footer from "@/pages/Public/components/Footer/index.vue";

import Navigation from "./layout/navigation/Index.vue";
import HeaderBar from "./layout/header-bar/Index.vue";

import { useHead } from "@vueuse/head";
import store from "./store/store";

export default {
  setup() {
    useHead({
      meta: [
        {
          name: "description",
          content:
            "Find your latest crypto news, prices and swap your tokens at MarketCyclop.",
        },
      ],
    });
  },
  data() {
    return {
      title: "Test",
      loaded: false,
    };
  },
  components: {
    Navbar,
    Footer,
    Navigation,
    HeaderBar,
  },
  mounted() {
    const channel = this.$pusher.subscribe("test-channel");
    channel.bind("asset-updated", function (data) {
      store.commit("assets/updateAssets", data.assets);
    });
  },
  async beforeMount() {
    await this.$store.dispatch("app/loadAppData");
  },
};
</script>
