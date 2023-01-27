<template>
  <div
    class="w-full md:max-w-sm rounded overflow-hidden relative shadow-lg bg-gray-600 flex flex-col"
  >
    <div
      v-for="(post, index) in featuredPosts"
      v-bind:key="post.id"
      :class="{ hidden: index !== currentIndex }"
    >
      <div>
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ post.title }}</div>
          <div class="text-gray-100 text-base">
            {{ post.content }}
          </div>
          <router-link :to="post.slug" class="mt-1 text-xs"
            >Read More</router-link
          >
        </div>
        <div class="px-6 pb-1 mt-auto">
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
    </div>

    <div class="flex justify-center space-x-1 absolute bottom-0 w-full">
      <div v-for="index in featuredPosts.length" v-bind:key="index">
        <div
          @click="currentIndex = index - 1"
          :class="{ 'text-gray-200': currentIndex === index - 1 }"
          class="text-2xl cursor-pointer"
        >
          &#x2022;
        </div>
      </div>
    </div>

    <div
      class="absolute left-1 chevron-pos"
      @click="newPost(this.currentIndex - 1)"
    >
      <ChevronLeftIcon class="w-4 h-4" />
    </div>

    <div
      class="absolute right-1 chevron-pos"
      @click="newPost(this.currentIndex + 1)"
    >
      <ChevronRightIcon class="w-4 h-4" />
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/solid";

export default {
  components: { ChevronRightIcon, ChevronLeftIcon },
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
  mounted() {
    setInterval(() => {
      if (this.currentIndex === this.featuredPosts.length - 1) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
    }, 6000);
  },
  methods: {
    newPost(index) {
      // If we are at first post go to last
      if (index < 0) {
        this.currentIndex = this.featuredPosts.length - 1;
        return;
      }

      // If we are at last post go to first
      if (index >= this.featuredPosts.length) {
        this.currentIndex = 0;
        return;
      }

      this.currentIndex = index;
    },
  },
};
</script>

<style>
.chevron-pos {
  top: calc(50% - 8px);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
