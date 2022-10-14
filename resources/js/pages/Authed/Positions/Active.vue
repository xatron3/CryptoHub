<template>
  <div>
    <div v-if="this.active_positions" class="max-w-4xl space-y-2">
      <h2 class="text-lg font-bold dark:text-white">Active Positions</h2>

      <!-- Filter -->
      <div class="flex">
        <Filter @filterChange="updateFilter"></Filter>

        <div class="ml-auto">
          <Button title="Add New" @click="this.showPositionModal = true" />
        </div>
      </div>

      <!-- Active Positions Table -->
      <Table
        :items="this.active_positions"
        :columns="keyColumns"
        buttonTitle="Close"
        @button_clicked="showClosePosition"
      />
    </div>

    <!-- Close Modal -->
    <ClosePosition
      :show="this.showClosePositionModal"
      :id="this.closeId"
      @hideModal="this.showClosePositionModal = false"
      @refreshPositions="refreshPositions"
    />

    <!-- New Position Modal -->
    <NewPosition
      :show="this.showPositionModal"
      @hideModal="this.showPositionModal = false"
      @refreshPositions="refreshPositions"
    />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";

import Filter from "./components/Filter.vue";
import NewPosition from "./components/NewPosition.vue";
import ClosePosition from "./components/ClosePosition.vue";

import { getPosition } from "@/services/positions";

import { useToast } from "vue-toastification";

export default {
  name: "Position Active",
  components: {
    Table,
    Filter,
    NewPosition,
    ClosePosition,
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      active_positions: null,
      filter: {
        grouped: true,
        sell_asset: null,
        sort_by: "profit",
      },
      showPositionModal: false,
      showClosePositionModal: false,
      closeId: 0,
    };
  },
  computed: {
    keyColumns() {
      let columns;

      if (this.filter.grouped) {
        columns = ["sell_amount", "buy_amount", "buy_price", "profit"];
      } else {
        columns = [
          "sell_amount",
          "buy_amount",
          "buy_price",
          "profit",
          "button",
        ];
      }

      return columns;
    },
  },
  async mounted() {
    await this.refreshPositions();
  },
  methods: {
    async refreshPositions() {
      this.active_positions = await getPosition(this.filter);
    },
    showClosePosition(data) {
      this.showClosePositionModal = true;
      this.closeId = data.id;
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
