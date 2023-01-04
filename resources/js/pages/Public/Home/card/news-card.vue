<template>
  <div
    class="w-full md:max-w-sm rounded overflow-hidden shadow-lg bg-gray-600 flex flex-col"
  >
    <div
      v-for="(post, index) in featuredPosts"
      v-bind:key="post.id"
      :class="{ hidden: index !== currentIndex }"
    >
      <div class="px-6 py-4">
        <div class="font-bold text-xl mb-2">{{ post.title }}</div>
        <div class="text-gray-100 text-base">
          {{ post.content }}
        </div>
        <a :href="post.slug" class="mt-1 text-xs">Read More</a>
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

    <div class="flex justify-center space-x-1">
      <div v-for="index in featuredPosts.length" v-bind:key="index">
        <div
          @click="currentIndex = index - 1"
          :class="{ 'text-green-500': currentIndex === index - 1 }"
        >
          *
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    featuredPosts() {
      return this.$store.getters["posts/all"].slice(0, 4);
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
};
</script>

<style></style>
