<template>
  <div
    class="min-w-max pb-1 mb-0.5 mt-3 uppercase text-sm font-semibold border-b border-gray-300 dark:text-white"
  >
    <span>{{ this.title }}</span>
  </div>
</template>

<script>
export default {
  props: ["title"],
  name: "NavigationHeader",
  computed: {
    lcTitle() {
      return this.title.toLowerCase();
    },
  },
};
</script>
