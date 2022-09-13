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
  async mounted() {
    console.log(cookie.getItem("access_token"));
    if (cookie.getItem("access_token")) {
      let res = await axios.get("/api/user");

      this.$store.commit("setUser", res.data);
    }
  },
};
</script>
