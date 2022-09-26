<template>
  <div class="flex space-x-2">
    <Button
      title="Grouped"
      @click="$emit('filterChange', { id: 1 })"
      class="bg-yellow-500 hover:bg-yellow-400"
    />
    <Button
      title="Individual"
      @click="$emit('filterChange', { id: 2 })"
      class="bg-yellow-500 hover:bg-yellow-400"
    />
    <Select
      :items="this.assets"
      :keys="selectKeys"
      v-model="this.asset"
      :value="this.asset"
      class="h-11 self-end"
      @change="$emit('filterChange', { id: 3, asset: this.asset })"
    />
  </div>
</template>

<script>
import { getAssets } from "@/services/assets";

export default {
  name: "Filter",
  data() {
    return {
      assets: null,
      asset: null,
      selectKeys: ["symbol", "symbol"],
    };
  },
  async mounted() {
    this.assets = await getAssets({ sort_by: "name" });
  },
};
</script>
