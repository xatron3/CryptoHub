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

    <div class="flex flex-col space-y-1">
      <p class="text-black dark:text-white uppercase text-xs">Sell Asset</p>
      <Select
        startValue="te"
        :items="this.assets"
        :keys="selectKeys"
        v-model="this.sell_asset"
        :value="this.sell_asset"
        class="h-7 self-end"
        @change="$emit('filterChange', { id: 3, asset: this.sell_asset })"
      />
    </div>

    <div class="flex flex-col space-y-1">
      <p class="text-black dark:text-white uppercase text-xs">Buy Asset</p>
      <Select
        :items="this.assets"
        :keys="selectKeys"
        v-model="this.buy_asset"
        :value="this.buy_asset"
        class="h-7 self-end"
        @change="$emit('filterChange', { id: 4, asset: this.buy_asset })"
      />
    </div>
  </div>
</template>

<script>
import { getAssets } from "@/services/assets";

export default {
  name: "Filter",
  data() {
    return {
      assets: null,
      sell_asset: null,
      buy_asset: null,
      selectKeys: ["symbol", "symbol"],
    };
  },
  async mounted() {
    const assets = await getAssets({ sort_by: "name" });

    this.assets = assets.data;
  },
};
</script>
