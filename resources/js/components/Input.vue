<template>
  <div>
    <label
      v-if="_showLabel"
      :for="fieldId"
      class="text-sm font-medium ml-0.5"
      >{{ this.placeholder }}</label
    >

    <input
      :type="fieldType"
      class="w-full border p-2 rounded-md"
      :name="name"
      :id="fieldId"
      :placeholder="placeholder"
      @input="$emit('update:modelValue', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  props: ["placeholder", "name", "type", "showLabel", "modelValue"],
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
    _showLabel() {
      if (this.showLabel === undefined) {
        return true;
      } else {
        return this.showLabel;
      }
    },
  },
  mounted() {},
};
</script>
