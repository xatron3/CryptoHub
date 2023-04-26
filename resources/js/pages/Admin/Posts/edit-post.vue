<template>
  <div class="space-y-2" v-if="post !== null">
    <header-text>{{ post.title }}</header-text>
    Slug:
    <router-link :to="`/article/${post.slug}`"
      >https://127.0.0.1:8000/article/{{ post.slug }}</router-link
    >
    <textarea
      class="h-96 bg-gray-900 p-1 order-transparent focus:border-transparent focus:ring-0 w-full"
      >{{ post.content }}</textarea
    >
  </div>
</template>

<script>
export default {
  name: "edit-post",
  data() {
    return {
      post: null,
    };
  },
  mounted() {
    this.post = this.$store.getters["posts/get"](
      parseInt(this.$route.params.id)
    );
  },
};
</script>
