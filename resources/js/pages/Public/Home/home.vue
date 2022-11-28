<template>
  <div class="flex flex-col">
    <div class="max-w-6xl w-full mx-auto">
      <h2 class="text-2xl font-bold my-3">Latest News</h2>
      <div class="flex space-x-3">
        <Card />
        <Card />
        <Card />
      </div>
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
