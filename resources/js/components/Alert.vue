<template>
  <div :class="_type" class="p-2 rounded-md text-center text-white">
    {{ content }}
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: ["content", "type"],
  computed: {
    _type() {
      if (this.type === undefined) {
        return "bg-green-400";
      } else if (this.type === "success") {
        return "bg-green-400";
      } else if (this.type === "danger") {
        return "bg-red-400";
      } else if (this.type === "warning") {
        return "bg-yellow-400";
      } else {
        return "bg-green-400";
      }
    },
  },
};
</script>
