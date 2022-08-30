<template>
  <button :class="[bgColor]" class="px-3 py-2 rounded-md">
    {{ this.title }}
  </button>
</template>

<script>
export default {
  props: ["title"],
  name: "Button",
  computed: {
    bgColor() {
      return "bg-green-500 text-white hover:bg-green-600";
    },
  },
};
</script>
