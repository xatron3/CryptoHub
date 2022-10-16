<template>
  <select
    @input="$emit('update:modelValue', $event.target.value)"
    class="border w-full rounded-md"
  >
    <option></option>
    <option
      v-for="item in this.items"
      v-bind:key="item"
      :value="item[keys[0]]"
      class="rounded-md"
    >
      {{ item[keys[1]] }}
    </option>
  </select>
</template>

<script>
export default {
  props: ["items", "keys", "modelValue", "startValue"],
  name: "Select",
  mounted() {},
  computed: {
    _startValue() {
      if (this.startValue === undefined) {
        return "";
      } else {
        return this.startValue;
      }
    },
  },
};
</script>
