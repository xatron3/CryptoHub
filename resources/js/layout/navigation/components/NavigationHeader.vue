<template>
  <div
    class="min-w-max pb-1 mb-0.5 uppercase text-sm font-semibold border-b border-gray-300"
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
