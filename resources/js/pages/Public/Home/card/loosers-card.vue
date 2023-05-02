<template>
  <div
    class="w-full md:max-w-sm rounded overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-600"
  >
    <div class="px-6 py-4">
      <div class="font-semibold text-lg mb-2 uppercase">Loosers</div>

      <div class="space-y-1">
        <div v-for="asset in assets" v-bind:key="asset.id" class="flex">
          <span class="flex-1 flex items-center"
            ><div class="relative w-6 h-6 mr-1 rounded-full md:block">
              <img
                class="object-cover w-full h-full rounded-full"
                :src="asset.logo"
                loading="lazy"
              />
            </div>
            {{ asset.name }}</span
          >
          <span
            class="ml-auto font-semibold"
            :class="{
              'text-green-500': asset.price_change_24h >= 0,
              'text-red-500': asset.price_change_24h < 0,
            }"
            >{{ priceChange(asset) }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    assets() {
      return this.$store.getters["assets/all"]
        .sort(function (a, b) {
          return a.price_change_24h - b.price_change_24h;
        })
        .slice(0, 5);
    },
  },
  methods: {
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
  },
};
</script>

<style></style>
