<template>
  <div class="w-full overflow-x-auto">
    <table class="w-full shadow-md rounded-lg overflow-hidden">
      <thead>
        <tr
          class="text-xs md:text-md font-semibold tracking-wide text-left text-black dark:text-white bg-gray-100 dark:bg-gray-600 uppercase"
        >
          <th class="p-2 md:p-4">Name</th>
          <th class="p-2 md:p-4">Price</th>
          <th class="p-2 md:p-4 cursor-pointer" @click="sortOnMarketcap">
            Marketcap
          </th>
          <th
            class="p-2 md:p-4 hidden md:table-cell cursor-pointer"
            @click="sortOnPercentageChange"
          >
            24H Change
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(asset, index) in this.$store.getters['assets/allFiltered']"
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
            {{ currentPrice(asset) }}
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
            {{ priceChange(asset) }}
          </td>
        </tr>
      </tbody>
    </table>

    <div class="text-xs my-1 self-start">
      Showing page
      {{ this.$store.getters["assets/pageInfo"].currentPage }} out of
      {{ this.$store.getters["assets/pageInfo"].totalPages }}
    </div>

    <div class="mt-3 mx-auto rounded-md overflow-hidden flex justify-center">
      <div
        v-for="index in this.$store.getters['assets/pageInfo'].totalPages"
        v-bind:key="index"
        class="px-2 py-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-900 transition-all"
        :class="{
          'bg-gray-200 dark:bg-gray-600':
            this.$store.getters['assets/pageInfo'].page === index,
          'bg-gray-100 dark:bg-gray-700':
            this.$store.getters['assets/pageInfo'].page !== index,
        }"
        v-on:click="setPage(index)"
      >
        <span>{{ index }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
    currentPrice(asset) {
      return `$${nums.formatPrice(asset.current_price)}`;
    },
    priceChange(asset) {
      let priceChange;

      if (asset.price_change_24h > 0) {
        priceChange = `+${asset.price_change_24h.toFixed(2)}%`;
      } else {
        priceChange = `${asset.price_change_24h.toFixed(2)}%`;
      }

      return priceChange;
    },
    setPage(page) {
      this.$store.commit("assets/setPage", page);
    },
    sortOnPercentageChange() {
      if (this.$store.getters["assets/currentSorting"] === "gainers") {
        this.$store.commit("assets/setSorting", "loosers");
      } else {
        this.$store.commit("assets/setSorting", "gainers");
      }
    },
    sortOnMarketcap() {
      this.$store.commit("assets/setSorting", "marketcap");
    },
  },
};
</script>

<style></style>
