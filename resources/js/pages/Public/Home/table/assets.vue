<template>
  <div
    class="grid grid-flow-col items-center grid-cols-10 px-2 py-3 text-sm font-semibold bg-gray-300 dark:text-gray-100 dark:bg-gray-750 rounded-md"
  >
    <div class="col-span-4 cursor-pointer">NAME</div>
    <div class="col-span-2 cursor-pointer" @click="sortOnMarketcap">
      MARKETCAP
    </div>
    <div class="col-span-2 cursor-pointer">PRICE</div>
    <div class="col-span-2 cursor-pointer" @click="sortOnPercentageChange">
      24H CHANGE
    </div>
  </div>

  <div
    v-for="asset in this._assets"
    :key="asset.name"
    class="my-2 grid grid-flow-col grid-cols-10 items-center bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md"
  >
    <div class="col-span-4 flex items-center space-x-2">
      <img :src="asset.logo" class="w-6 h-6 rounded-full" />
      <div>
        <div class="-mt-0.5">{{ asset.name }}</div>
        <div class="text-xs">{{ asset.symbol }}</div>
      </div>
    </div>

    <div class="col-span-2">
      ${{ asset.market_cap.toLocaleString("en-US") }}
    </div>

    <div class="col-span-2">${{ asset.current_price }}</div>

    <div class="col-span-2">{{ asset.price_change_24h }}%</div>
  </div>
</template>

<script>
export default {
  props: ["assets"],
  data() {
    return {
      _assets: {},
      sort: "",
    };
  },
  mounted() {
    this._assets = this.assets;
  },
  methods: {
    sortOnPercentageChange() {
      if (this.sort === "gainers") {
        this.sort = "loosers";
        this._assets = this.$store.getters["assets/loosers"];
      } else {
        this._assets = this.$store.getters["assets/gainers"];
        this.sort = "gainers";
      }
    },
    sortOnMarketcap() {
      this.sort = "marketcap";
      this._assets = this.$store.getters["assets/marketcap"];
    },
  },
};
</script>

<style></style>
