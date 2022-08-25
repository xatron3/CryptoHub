<template>
  <input
    :type="fieldType"
    class="w-full border p-2 rounded-md"
    :name="name"
    :id="fieldId"
    :placeholder="placeholder"
  />
</template>

<script>
export default {
  props: ["placeholder", "name", "type"],
  name: "InputField",
  computed: {
    fieldId() {
      return "input_" + this.name;
    },
    fieldType() {
      var type;

      if (this.type === undefined) {
        type = "text";
      } else {
        type = this.type;
      }

      return type;
    },
  },
  mounted() {},
};
</script>
