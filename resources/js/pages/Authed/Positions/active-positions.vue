<template>
  <div>
    <div v-if="this.active_positions" class="max-w-4xl space-y-2">
      <HeaderText>Active Positions</HeaderText>

      <!-- Filter -->
      <div class="flex">
        <Filter @filterChange="updateFilter"></Filter>

        <div class="ml-auto space-x-2">
          <Button
            title="Export"
            class="bg-yellow-600 hover:bg-yellow-700"
            @click="this.showExportModal = true"
          />
          <Button title="Add New" @click="this.showPositionModal = true" />
        </div>
      </div>

      <!-- Active Positions Table -->
      <Table
        :items="this.active_positions"
        :key="this.active_positions"
        v-if="this.active_positions.length > 0"
        :headers="this.headers"
        @button_clicked="showClosePosition"
      />
    </div>

    <!-- Close Modal -->
    <ClosePositionModal
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

    <!-- Export Modal -->
    <ExportModal
      v-if="this.active_positions.length > 0"
      :show="this.showExportModal"
      :jsonData="this.active_positions"
      @hideModal="this.showExportModal = false"
    />
  </div>
</template>

<script>
import Filter from "./components/Filter.vue";
import NewPosition from "./components/NewPosition.vue";

import ClosePositionModal from "./components/ClosePositionModal.vue";
import ExportModal from "./components/ExportModal.vue";

import { useToast } from "vue-toastification";

export default {
  name: "Position Active",
  components: {
    Filter,
    NewPosition,
    ClosePositionModal,
    ExportModal,
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
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
          title: "B. Price",
          value: "buy_price",
          format: "price",
          hover: {
            value: "current_sell_price",
            format: "price",
          },
        },
        {
          title: "Profit",
          value: "profit",
          format: "profit",
        },
        {
          title: "Close",
          value:
            "<a href='#' class='bg-green-500 text-white hover:bg-green-600 transition-all px-3 py-2 rounded-md'>Close</a>", // TODO: Hook too func or smth
          customValue: true,
        },
      ],
      active_positions: {},
      showPositionModal: false,
      showClosePositionModal: false,
      showExportModal: false,
      closeId: 0,
    };
  },
  computed: {
    keyColumns() {
      let columns;
      return columns;
    },
  },
  mounted() {
    this.refreshPositions();
  },
  methods: {
    showClosePosition(data) {
      this.showClosePositionModal = true;
      this.closeId = data.id;
    },
    refreshPositions() {
      this.active_positions = this.$store.getters["user/allPositions"];
    },
    async updateFilter(data) {
      if (data.id === 1) {
        await this.$store.dispatch("user/updatePositions", true);
        this.active_positions = this.$store.getters["user/allPositions"];
      } else if (data.id === 2) {
        await this.$store.dispatch("user/updatePositions", false);
        this.active_positions = this.$store.getters["user/allPositions"];
      } else if (data.id === 3 && data.asset !== "") {
        this.active_positions = this.$store.getters["user/allPositions"].filter(
          (position) => position.sell_asset_symbol === data.asset
        );
      } else if (data.id === 4 && data.asset !== "") {
        this.active_positions = this.$store.getters["user/allPositions"].filter(
          (position) => position.buy_asset_symbol === data.asset
        );
      } else {
        this.refreshPositions();
      }
    },
  },
};
</script>
