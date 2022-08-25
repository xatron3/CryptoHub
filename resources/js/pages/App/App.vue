<template>
  <div class="h-screen w-screen flex bg-gray-200">
    <Navigation></Navigation>
    <div class="flex w-full">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from "../../layout/navigation/Index.vue";

export default {
  data() {
    return {
      title: "Test",
    };
  },
  components: {
    Navigation,
  },
};
</script>
