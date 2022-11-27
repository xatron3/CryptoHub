<template>
  <div class="flex flex-col">
    <Navbar />

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
import Navbar from "@/pages/Public/components/Navbar/navbar.vue";
import Card from "./card/index.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Card,
  },
};
</script>
