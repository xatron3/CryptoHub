<template>
  <div>
    <div v-if="this.closed_positions" class="max-w-4xl space-y-2">
      <HeaderText>Closed Positions</HeaderText>
      <!-- Filter -->
      <Filter @filterChange="updateFilter"></Filter>

      <Table :items="this.closed_positions" :headers="this.headers" />
    </div>
  </div>
</template>

<script>
import Filter from "./components/Filter.vue";

import { getPosition } from "@/services/positions";

export default {
  name: "PositionActive",
  components: {
    Filter,
  },
  data() {
    return {
      headers: [
        {
          title: "S. Amount",
          value: "sell_amount",
          format: "sell_logo",
        },
        {
          title: "B. Amount",
          value: "buy_amount",
          format: "buy_logo",
        },
        {
          title: "Profit",
          value: "profit",
          format: "profit",
        },
      ],
      key_columns: ["sell_amount", "buy_amount", "profit"],
      closed_positions: null,
      filter: {
        closed: true,
        grouped: true,
        sell_asset: null,
        buy_asset: null,
      },
    };
  },
  async mounted() {
    await this.refreshPositions();
  },
  methods: {
    async refreshPositions() {
      this.closed_positions = await getPosition(this.filter);
    },
    async updateFilter(data) {
      if (data.id === 1) {
        this.filter.grouped = true;
      } else if (data.id === 2) {
        this.filter.grouped = false;
      } else if (data.id === 3) {
        this.filter.sell_asset = data.asset;
      } else if (data.id === 4) {
        this.filter.buy_asset = data.asset;
      }

      await this.refreshPositions();
    },
  },
};
</script>
