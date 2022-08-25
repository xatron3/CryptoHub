<template>
  <div class="min-w-max">
    <router-link
      :to="this.path"
      :aria-label="lcTitle"
      class="group flex items-center space-x-4 rounded-md text-sm py-1.5 text-gray-600"
    >
      <span class="-mr-1">{{ this.title }}</span>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["title", "path"],
  name: "NavigationLink",
  computed: {
    lcTitle() {
      return this.title.toLowerCase();
    },
  },
};
</script>
