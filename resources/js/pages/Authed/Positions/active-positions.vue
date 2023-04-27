<template>
  <div>
    <div v-if="this.active_positions" class="max-w-6xl space-y-2">
      <HeaderText>Active Positions</HeaderText>

      <div class="grid grid-cols-4 gap-2">
        <div
          class="bg-gray-200 dark:bg-gray-700 p-2 rounded-md"
          v-for="(position, positionSymbol) in this.$store.getters[
            'positions/totalPositionsValue'
          ]"
        >
          <h2 class="text-lg uppercase font-semibold">
            Total {{ positionSymbol }}
          </h2>
          <div class="flex space-x-2">
            <img :src="position.logo" class="w-6" />
            <span
              >{{ currentPrice(position.sell_amount) }}
              <span class="text-red-400"
                >({{ position.pnl.toFixed(2) }})</span
              ></span
            >
          </div>
        </div>
      </div>

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
        :key="this.$store.getters['positions/allPositions']"
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
    currentPrice(price) {
      return `${nums.formatPrice(price)}`;
    },
    showClosePosition(data) {
      this.showClosePositionModal = true;
      this.closeId = data.id;
    },
    refreshPositions() {
      this.active_positions = this.$store.getters["positions/allPositions"];
    },
    async updateFilter(data) {
      if (data.id === 1) {
        await this.$store.dispatch("positions/updatePositions", true);
        this.active_positions = this.$store.getters["positions/allPositions"];
      } else if (data.id === 2) {
        await this.$store.dispatch("positions/updatePositions", false);
        this.active_positions = this.$store.getters["positions/allPositions"];
      } else if (data.id === 3 && data.asset !== "") {
        this.active_positions = this.$store.getters[
          "positions/allPositions"
        ].filter((position) => position.sell_asset_symbol === data.asset);
      } else if (data.id === 4 && data.asset !== "") {
        this.active_positions = this.$store.getters[
          "positions/allPositions"
        ].filter((position) => position.buy_asset_symbol === data.asset);
      } else {
        this.refreshPositions();
      }
    },
  },
};
</script>
