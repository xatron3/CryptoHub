<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr
          class="text-xs md:text-md font-semibold tracking-wide text-left text-black dark:text-white bg-gray-100 dark:bg-gray-600 uppercase"
        >
          <th class="p-2 md:p-4">Name</th>
          <th class="p-2 md:p-4">Price</th>
          <th class="p-2 md:p-4" @click="sortOnMarketcap">Marketcap</th>
          <th
            class="p-2 md:p-4 hidden md:table-cell"
            @click="sortOnPercentageChange"
          >
            24H Change
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(asset, index) in this.assets"
          :key="asset.name"
          :class="{
            'dark:bg-gray-750 bg-gray-300': index % 2 === 0,
            'dark:bg-gray-700 bg-gray-200': index % 2 !== 0,
          }"
          class="text-gray-50"
        >
          <!-- Logo and Name + Symbol -->
          <td class="px-1 py-1 md:px-4 md:py-3">
            <div class="flex items-center text-sm">
              <div class="relative w-8 h-8 mr-3 rounded-full md:block">
                <a href="#"
                  ><img
                    class="object-cover w-full h-full rounded-full"
                    :src="asset.logo"
                    loading="lazy"
                /></a>
              </div>
              <a href="#">
                <p
                  class="text-xs md:text-base font-semibold text-black dark:text-white"
                >
                  {{ asset.name }}
                </p>
                <p
                  class="text-xs text-gray-800 font-semibold dark:text-gray-50"
                >
                  {{ asset.symbol }}
                </p>
              </a>
            </div>
          </td>

          <!-- Price -->
          <td
            class="text-xs md:text-base px-1 py-1 md:px-4 md:py-3 font-semibold text-black dark:text-white"
          >
            ${{ price(asset) }}
          </td>

          <!-- Marketcap -->
          <td
            class="text-xs md:text-base px-1 py-1 md:px-4 md:py-3 font-semibold text-black dark:text-white"
          >
            {{ marketCap(asset) }}
          </td>

          <!-- Price Change -->
          <td
            :class="{
              'text-green-400': asset.price_change_24h >= 0,
              'text-red-400': asset.price_change_24h < 0,
            }"
            class="px-1 py-1 md:px-4 md:py-3 font-semibold hidden md:table-cell"
          >
            {{ asset.price_change_24h.toFixed(2) }}%
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      sort: "",
      assets: {},
    };
  },
  computed: {},
  mounted() {
    this.assets = this.$store.getters["assets/marketcap"];
  },
  methods: {
    marketCap(asset) {
      let market_cap;

      if (parseInt(asset.market_cap) > 0) {
        market_cap = `$${asset.market_cap.toLocaleString("en-US")}`;
      } else {
        market_cap = "-";
      }

      return market_cap;
    },
    price(asset) {
      return nums.formatPrice(asset.current_price);
    },
    sortOnPercentageChange() {
      if (this.sort === "gainers") {
        this.sort = "loosers";
        this.assets = this.$store.getters["assets/loosers"];
      } else {
        this.assets = this.$store.getters["assets/gainers"];
        this.sort = "gainers";
      }
    },
    sortOnMarketcap() {
      this.sort = "marketcap";
      this.assets = this.$store.getters["assets/marketcap"];
    },
  },
};
</script>

<style></style>
