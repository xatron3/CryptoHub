<template>
  <div
    class="flex flex-col rounded-md bg-gray-100 dark:bg-gray-700 px-2 md:px-4 py-2"
  >
    <h2 class="text-2xl dark:text-gray-100">{{ this.title }}</h2>
    <div class="grid grid-cols-1">
      <span class="dark:text-gray-200">Buy Amount (Asset)</span>
    </div>

    <div
      v-for="item in formattedPositions"
      :key="item"
      class="grid grid-cols-3 border-b py-0.5 dark:border-gray-600"
    >
      <span class="col-span-2">
        <div class="group">
          <div class="flex group-hover:hidden items-center space-x-1.5">
            <img :src="item.buy_logo" class="h-4" />
            <span class="dark:text-gray-200">{{
              `${item.buy_amount} ${item.buy_symbol}`
            }}</span>
          </div>
          <span
            class="hidden group-hover:flex group-hover:opacity-100 items-center space-x-1.5"
          >
            <img :src="item.sell_logo" class="h-4" />
            <span class="dark:text-gray-200">{{
              `${item.sell_amount} ${item.sell_symbol}`
            }}</span>
          </span>
        </div>
      </span>
      <span
        class="col-span-1 font-semibold"
        v-html="getPercentageIncrease(item)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["positions", "title"],
  name: "PositionCard",
  computed: {
    formattedPositions() {
      if (this.positions.length > 0) return this.positions.slice(0, 10);

      return [];
    },
  },
  methods: {
    getPercentageIncrease(item) {
      let sellPrice =
        this.$store.getters["assets/get"](item.buy_asset_id).current_price /
        this.$store.getters["assets/get"](item.sell_asset_id).current_price;

      const number = nums.getPercentageIncrease(sellPrice, item.buy_price);
      let _class;

      if (number === 0) {
        _class = "text-yellow-500";
      } else if (number > 0) {
        _class = "text-green-500";
      } else {
        _class = "text-red-500";
      }

      return `<span class="${_class}">(${number.toFixed(2)}%)</span>`;
    },
  },
};
</script>
