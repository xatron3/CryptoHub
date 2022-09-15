<template>
  <div class="flex space-x-2">
    <Button
      title="Individual"
      @click="$emit('filterChange', 1)"
      class="bg-yellow-500 hover:bg-yellow-400"
    />
    <Button
      title="Grouped"
      @click="$emit('filterChange', 2)"
      class="bg-yellow-500 hover:bg-yellow-400"
    />
  </div>
</template>

<script>
export default {
  name: "Filter",
};
</script>
