<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold my-3">Latest News</h2>
    <div
      class="flex space-x-0 space-y-2 flex-col md:space-y-0 md:space-x-3 md:flex-row"
    >
      <Card />
      <Card />
      <Card />
    </div>
  </div>
</template>

<script>
import Card from "./card/index.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
};
</script>
