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
    <vue-final-modal v-model="closeInfo.show_modal">
      <div class="flex items-center space-x-2">
        <span>Close Amount</span>
        <Input
          v-model="closeInfo.amount"
          :value="closeInfo.amount"
          name="close_amount"
          id="close_amount"
          type="number"
        />
      </div>
      <Button title="Close" @click="closePosition" class="py-1.5" />

      <button class="vfm__close" @click="closeInfo.show_modal = false">
        X
      </button>
    </vue-final-modal>

    <!-- New Position Modal -->
    <NewPosition
      :show="this.showPositionModal"
      @hideModal="this.showPositionModal = false"
      @refreshPositions="refreshPositions"
    />
  </div>
</template>

<script>
import Select from "../../components/Select.vue";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";
import Table from "../../components/Table.vue";
import Filter from "./components/Filter.vue";

import { getPosition, closePosition } from "../../services/positions";

import { useToast } from "vue-toastification";
import NewPosition from "./components/NewPosition.vue";

export default {
  name: "Position Active",
  components: {
    Select,
    Input,
    Button,
    Table,
    Filter,
    NewPosition,
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
      closeInfo: {
        amount: 0,
        id: 0,
        show_modal: false,
      },
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
      this.closeInfo.show_modal = true;
      this.closeInfo.id = data.id;
    },
    async updateFilter(data) {
      if (data === 1) {
        this.grouped = false;
      } else if (data === 2) {
        this.grouped = true;
      }

      await this.refreshPositions();
    },
    async closePosition() {
      if (this.closeInfo.amount === 0) {
        this.toast.error("Enter a close amount");
        return;
      }

      if (this.closeInfo.id === 0) {
        this.toast.error("Error with getting position ID");
        return;
      }

      let result = await closePosition(this.closeInfo);

      if (result.status === 200) {
        this.toast.success(`Successfully closed position`);

        this.closeInfo.show_modal = false;
        this.closeInfo.amount = 0;
        this.closeInfo.id = 0;

        await this.refreshPositions();
      } else {
        this.toast.error(result.message);
      }
    },
  },
};
</script>
