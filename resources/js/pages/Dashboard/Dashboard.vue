<template>
  <div class="flex space-x-4">
    <div class="flex flex-col w-1/4 rounded-md bg-slate-300 p-4">
      Losses
      <div
        v-for="losses in this.positions.losses"
        :key="losses"
        class="space-x-2"
      >
        <span>{{ losses.buy_symbol }}</span>
        <span>{{ losses.current_sell_price }}</span>
      </div>
    </div>

    <div class="flex flex-col w-1/4 rounded-md bg-slate-300 p-4">
      Profit
      <div v-for="profit in this.positions.profit" :key="profit">
        {{ profit.current_sell_price }}
      </div>
    </div>
  </div>
</template>

<script>
import { getPosition } from "../../services/positions";

export default {
  name: "Home",
  setup() {},
  data() {
    return {
      positions: {
        all: null,
        profit: null,
        losses: null,
      },
    };
  },
  async mounted() {
    this.loadAndSort();
  },
  methods: {
    async loadAndSort() {
      this.positions.all = await getPosition({ grouped: true });

      this.positions.profit = this.positions.all.filter((item) => {
        return item.current_sell_price > item.price;
      });

      this.positions.losses = this.positions.all.filter((item) => {
        return item.current_sell_price < item.price;
      });
    },
  },
};
</script>
