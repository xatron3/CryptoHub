<template>
  <div>
    <label
      v-if="_showLabel"
      :for="fieldId"
      class="text-xs font-semibold ml-0.5 dark:text-white uppercase"
      >{{ this.placeholder }}</label
    >

    <div class="relative">
      <img :src="this.icon" class="absolute w-6 ml-1 icon" v-if="this.icon" />
      <input
        :type="fieldType"
        :autocomplete="_autocomplete"
        :disabled="_disabled"
        class="w-full border px-2 py-1 text-sm rounded-md focus:border-0 dark:text-black"
        :class="[_class, iconClass]"
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
    "icon",
    "autocomplete",
    "disabled",
  ],
  name: "InputField",
  computed: {
    _autocomplete() {
      if (this.autocomplete === undefined) {
        return "on";
      } else {
        return this.autocomplete;
      }
    },
    _disabled() {
      if (this.disabled === undefined) {
        return false;
      } else {
        return true;
      }
    },
    iconClass() {
      if (this.icon === undefined) {
        return;
      } else {
        return "pl-8";
      }
    },
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

<style scoped>
.icon {
  top: calc(50% - 12px);
}
</style>
