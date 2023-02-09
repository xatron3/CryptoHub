<template>
  <div v-if="dataLoaded" class="mt-4 space-y-2">
    <h1 class="text-3xl font-bold">{{ article.title }}</h1>
    <div v-html="article.content"></div>
    <div class="">
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#FTX</span
      >
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#crypto</span
      >
      <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
        >#fruad</span
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Article",
  data() {
    return {
      article: {},
    };
  },
  computed: {
    dataLoaded() {
      return Object.keys(this.article).indexOf("title") > -1;
    },
  },
  mounted() {
    const article = this.$store.getters["posts/get"](this.$route.params.title);
    this.article = article;
  },
};
</script>
