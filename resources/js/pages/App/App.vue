<template>
  <div class="h-screen w-screen flex bg-gray-200">
    <Navigation
      v-if="this.$store.state.user !== null && this.$store.state.user !== false"
    ></Navigation>
    <div class="w-full p-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "../../layout/navigation/Index.vue";
import { useCookies } from "vue3-cookies";
import axios from "axios";

export default {
  data() {
    return {
      title: "Test",
    };
  },
  components: {
    Navigation,
  },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  async mounted() {
    if (this.cookies.get("access_token")) {
      let res = await axios.get("/api/user");

      this.$store.commit("setUser", res.data);
    }
  },
};
</script>
