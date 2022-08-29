<template>
  <select @input="$emit('update:modelValue', $event.target.value)">
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
  props: ["items", "keys", "modelValue"],
  name: "Select",
  mounted() {},
  computed: {},
};
</script>
