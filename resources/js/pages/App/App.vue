<template>
  <div class="h-screen w-screen flex bg-gray-200">
    <Navigation v-if="hasUser"></Navigation>
    <div class="w-full">
      <HeaderBar v-if="hasUser"></HeaderBar>
      <router-view class="p-4"></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "../../layout/navigation/Index.vue";
import axios from "axios";
import HeaderBar from "../../layout/header-bar/Index.vue";

export default {
  data() {
    return {
      title: "Test",
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
  async mounted() {
    console.log(cookie.getItem("access_token"));
    if (cookie.getItem("access_token")) {
      let res = await axios.get("/api/user");

      this.$store.commit("setUser", res.data);
    }
  },
};
</script>
