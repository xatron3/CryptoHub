<template>
  <div v-if="dataLoaded" class="mt-4 space-y-2">
    <div class="max-w-4xl mx-auto my-8">
      <!-- Blog Post Title -->
      <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>

      <!-- Blog Post Thumbnail -->
      <img
        src="https://via.placeholder.com/640x360.png?text=Blog+Post+Thumbnail"
        alt="Blog Post Thumbnail"
        class="w-full rounded-md mb-4"
      />

      <!-- Blog Post Content -->
      <div class="leading-7 article-content" v-html="post.content"></div>

      <!-- Tags -->
      <div class="mt-4">
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >#tag1</span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >#tag2</span
        >
        <span
          class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >#tag3</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { useHead } from "@vueuse/head";

export default {
  name: "Post",
  data() {
    return {
      post: {},
    };
  },
  setup() {
    useHead({
      meta: [
        {
          name: "title",
          content: `Post`,
        },
        {
          name: "description",
          content:
            "Latest crypto prices always up to date. Find your new top project today.",
        },
      ],
    });
  },
  computed: {
    dataLoaded() {
      return Object.keys(this.post).indexOf("title") > -1;
    },
  },
  mounted() {
    const post = this.$store.getters["posts/get"](this.$route.params.title);
    this.post = post;
  },
};
</script>

<style>
h1,
h2,
h3,
h4,
h5,
h6 {
  line-height: 150%;
}

h2 {
  font-size: 26px;
}

h3 {
  font-size: 22px;
}
</style>
