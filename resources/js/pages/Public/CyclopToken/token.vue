<template>
  <div class="flex flex-col">
    <h2 class="text-2xl font-bold my-3">Cyclop Token</h2>
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
  methods: {
    markdownToHtml() {
      return marke;
    },
  },
};
</script>

<style></style>
