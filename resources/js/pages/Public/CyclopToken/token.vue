<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-semibold my-3 uppercase h-font">Cyclop Token</h2>
    <div>20M T. Supply</div>
    <Markdown :source="this.markdown" />
  </div>
</template>

<script>
import Markdown from "vue3-markdown-it";

export default {
  data() {
    return {
      markdown: "# Hello World",
    };
  },
  components: {
    Markdown,
  },
  methods: {},
};
</script>

<style></style>
