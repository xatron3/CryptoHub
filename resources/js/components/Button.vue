<template>
  <button
    :class="[bgColor]"
    class="px-2 py-1.5 rounded-md uppercase font-semibold text-sm"
  >
    {{ this.title }}
  </button>
</template>

<script>
export default {
  props: ["title"],
  name: "Button",
  computed: {
    bgColor() {
      return "bg-green-500 text-white hover:bg-green-600 transition ease-in-out duration-150";
    },
  },
};
</script>
