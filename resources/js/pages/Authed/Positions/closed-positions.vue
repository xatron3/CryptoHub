<template>
  <div>
    <div v-if="this.closed_positions" class="max-w-4xl space-y-2">
      <h2 class="text-lg font-bold dark:text-white">Closed Positions</h2>
      <!-- Filter -->
      <Filter @filterChange="updateFilter"></Filter>

      <Table :items="this.closed_positions" :columns="key_columns" />
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

import Filter from "./components/Filter.vue";

import { getPosition } from "@/services/positions";

export default {
  name: "PositionActive",
  components: {
    Table,
    Filter,
  },
  data() {
    return {
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
