<template>
  <div
    class="flex flex-col w-1/4 rounded-md bg-slate-300 dark:bg-slate-700 px-4 py-2"
  >
    <h2 class="text-2xl dark:text-gray-100">{{ this.title }}</h2>
    <div class="grid grid-cols-3">
      <span class="col-span-2 dark:text-gray-200">Buy Amount (Asset)</span>
    </div>

    <div
      v-for="item in positions"
      :key="item"
      class="grid grid-cols-3 border-b py-0.5 dark:border-slate-600"
    >
      <span class="col-span-2 flex items-center space-x-1.5">
        <img :src="item.buy_logo" class="h-4" />
        <span class="dark:text-gray-200">{{
          `${nums.formatPrice(item.buy_amount)} ${item.buy_symbol}`
        }}</span>
      </span>
      <span
        class="col-span-1"
        v-html="getPercentageIncrease(item.current_sell_price, item.buy_price)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["positions", "title"],
  name: "PositionCard",
  data() {
    return {
      nums: null,
    };
  },
  mounted() {
    this.nums = nums;
  },
  methods: {
    getPercentageIncrease(a, b) {
      const number = nums.getPercentageIncrease(a, b);
      let _class;

      if (number === 0) {
        _class = "text-yellow-600";
      } else if (number > 0) {
        _class = "text-green-400";
      } else {
        _class = "text-red-400";
      }

      return `<span class="${_class}">(${number.toFixed(2)}%)</span>`;
    },
  },
};
</script>
