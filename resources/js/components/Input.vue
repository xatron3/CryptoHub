<template>
  <div>
    <label
      v-if="_showLabel"
      :for="fieldId"
      class="text-sm font-medium ml-0.5 dark:text-white"
      >{{ this.placeholder }}</label
    >

    <div class="">
      <input
        :type="fieldType"
        class="w-full border p-2 rounded-md"
        :class="_class"
        :name="name"
        :id="fieldId"
        :value="value"
        :placeholder="placeholder"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: [
    "placeholder",
    "name",
    "type",
    "showLabel",
    "modelValue",
    "value",
    "class",
  ],
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
    _class() {
      if (this.class === undefined) {
        return "";
      } else {
        return this.class;
      }
    },
  },
  mounted() {},
};
</script>
