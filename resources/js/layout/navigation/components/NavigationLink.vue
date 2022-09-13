<template>
  <div class="min-w-max">
    <router-link
      :to="this.path"
      :aria-label="lcTitle"
      class="group flex items-center space-x-1 rounded-md text-sm py-1.5 text-gray-600"
    >
      <component :is="this.icon" class="h-5 w-5" />
      <span class="-mr-1">{{ this.title }}</span>
    </router-link>
  </div>
</template>

<script>
import { Squares2X2Icon, BriefcaseIcon } from "@heroicons/vue/24/solid";

export default {
  props: ["title", "path", "icon"],
  name: "NavigationLink",
  components: {
    Squares2X2Icon,
    BriefcaseIcon,
  },
  computed: {
    lcTitle() {
      return this.title.toLowerCase();
    },
  },
  mounted() {
    console.log(this.icon);
  },
};
</script>
