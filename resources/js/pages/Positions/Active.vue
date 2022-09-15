<template>
  <div>
    <div v-if="this.active_positions" class="max-w-4xl space-y-2">
      <h2 class="text-lg font-bold">Active Positions</h2>

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
        :columns="key_columns"
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
import Table from "../../components/Table.vue";
import Filter from "./components/Filter.vue";

import { getPosition, closePosition } from "../../services/positions";

import { useToast } from "vue-toastification";
import NewPosition from "./components/NewPosition.vue";
import ClosePosition from "./components/ClosePosition.vue";

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
      key_columns: [
        "sell_amount",
        "buy_amount",
        "price",
        "current_sell_price",
        "close",
      ],
      active_positions: null,
      grouped: false,
      showPositionModal: false,
      showClosePositionModal: false,
      closeId: 0,
    };
  },
  async mounted() {
    await this.refreshPositions();
  },
  methods: {
    async refreshPositions() {
      this.active_positions = await getPosition({ grouped: this.grouped });
    },
    showClosePosition(data) {
      this.showClosePositionModal = true;
      this.closeId = data.id;
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
