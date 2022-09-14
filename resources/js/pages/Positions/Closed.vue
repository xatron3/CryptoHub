<template>
  <div>
    <div v-if="this.closed_positions" class="max-w-4xl space-y-2">
      <h2 class="text-lg font-bold">Closed Positions</h2>
      <!-- Filter -->
      <Filter @filterChange="updateFilter"></Filter>

      <Table :items="this.closed_positions" :columns="key_columns" />
    </div>
  </div>
</template>

<script>
import Select from "../../components/Select.vue";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";
import Table from "../../components/Table.vue";

import Filter from "./components/Filter.vue";

import { getPosition } from "../../services/positions";

export default {
  name: "PositionActive",
  components: {
    Select,
    Input,
    Button,
    Table,
    Filter,
  },
  data() {
    return {
      key_columns: ["sell_amount", "buy_amount", "close_amount", "profit"],
      closed_positions: null,
      grouped: false,
    };
  },
  async mounted() {
    await this.refreshPositions();
  },
  methods: {
    async refreshPositions() {
      this.closed_positions = await getPosition({
        closed: true,
        grouped: this.grouped,
      });
    },
    async updateFilter(data) {
      if (data === 1) {
        this.grouped = false;
      } else if (data === 2) {
        this.grouped = true;
      }

      await this.refreshPositions();
    },
  },
};
</script>
