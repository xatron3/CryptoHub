<template>
  <div class="flex flex-col">
    <div>
      <h2 class="text-2xl font-bold my-3">Latest News</h2>
      <div
        class="flex space-x-0 space-y-2 flex-col md:space-y-0 md:space-x-3 md:flex-row"
      >
        <Card />
        <Card />
        <Card />
      </div>
    </div>

    <div v-if="this.assets" class="mt-2">
      <div
        class="grid grid-flow-col items-center grid-cols-10 px-2 py-1 text-sm font-semibold text-gray-100"
      >
        <div class="col-span-1 text-center">LOGO</div>
        <div class="col-span-5">NAME</div>
        <div class="col-span-2">PRICE</div>
        <div class="col-span-2">24H CHANGE</div>
      </div>

      <div
        v-for="asset in this.assets"
        :key="asset.name"
        class="my-2 grid grid-flow-col grid-cols-10 items-center bg-gray-700 px-2 py-1 rounded-md"
      >
        <div class="col-span-1 flex justify-center">
          <img :src="asset.logo" class="w-6 h-6 rounded-full" />
        </div>

        <div class="col-span-5">
          <div class="-mt-0.5">{{ asset.name }}</div>
          <div class="text-xs">{{ asset.symbol }}</div>
        </div>

        <div class="col-span-2">${{ asset.current_price }}</div>

        <div class="col-span-2">{{ asset.price_change_24h }}%</div>
      </div>
    </div>
  </div>
</template>

<script>
import Card from "./card/index.vue";
import { getAssets } from "@/services/assets";

export default {
  name: "Home",
  components: {
    Card,
  },
  data() {
    return {
      assets: null,
    };
  },
  async mounted() {
    await this.fetchAssets();
  },
  methods: {
    async fetchAssets() {
      const res = await getAssets();
      this.assets = res.data;
    },
  },
};
</script>
