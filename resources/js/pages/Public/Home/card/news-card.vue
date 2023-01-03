<template>
  <div
    class="w-full md:max-w-sm rounded overflow-hidden shadow-lg bg-gray-600 flex flex-col"
  >
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ firstPost.title }}</div>
      <div class="text-gray-100 text-base">
        {{ firstPost.content }}
      </div>
      <a :href="firstPost.slug" class="mt-1 text-xs">Read More</a>
    </div>
    <div class="px-6 pb-2 mt-auto">
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
  computed: {
    firstPost() {
      return this.$store.getters["posts/get"](3);
    },
  },
};
</script>

<style></style>
