<template>
  <div class="relative">
    <div class="text-xs absolute right-4 top-2">
      Last Updated: {{ this.lastUpdated }}
    </div>
    <div class="flex space-x-4 mt-4">
      <PositionCard :positions="this.positions.losses" title="Losses" />
      <PositionCard :positions="this.positions.profit" title="Profit" />
    </div>
  </div>
</template>

<script>
import { getPosition } from "../../services/positions";
import PositionCard from "./components/PositionCard.vue";

export default {
  name: "Home",
  components: { PositionCard },
  data() {
    return {
      positions: {
        all: null,
        profit: null,
        losses: null,
      },
      lastUpdated: null,
    };
  },
  async mounted() {
    this.loadAndSort();
    setInterval(this.loadAndSort, 60000);
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

      const today = new Date();
      this.lastUpdated = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    },
  },
};
</script>
