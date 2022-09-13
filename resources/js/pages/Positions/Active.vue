<template>
  <div class="space-y-2 max-w-sm">
    <div class="flex space-x-2">
      <Input
        v-model="this.newPosition.sell_amount"
        :value="this.newPosition.sell_amount"
        id="sell_amount"
        name="buy_amount"
        placeholder="Sell amount"
      />

      <Select
        :items="this.assets"
        :keys="selectKeys"
        v-model="this.newPosition.sell_asset_id"
        class="h-11 self-end"
      />
    </div>

    <div class="flex space-x-2">
      <Input
        v-model="this.newPosition.buy_amount"
        :value="this.newPosition.buy_amount"
        id="buy_amount"
        name="buy_amount"
        placeholder="Buy amount"
      />

      <Select
        :items="this.assets"
        :keys="selectKeys"
        v-model="this.newPosition.buy_asset_id"
        class="h-10 self-end"
      />
    </div>

    <div class="flex">
      <Button
        title="Add position"
        @click="addPosition"
        class="mx-auto w-full"
      />
    </div>
  </div>

  <div v-if="this.active_positions" class="max-w-4xl mt-5 space-y-2">
    <h2 class="text-lg font-bold">Active Positions</h2>
    <div class="flex space-x-2 justify-between">
      <div class="space-x-2">
        <Button
          title="Individual"
          @click="setGrouped(false)"
          class="bg-yellow-500 hover:bg-yellow-400"
        />
        <Button
          title="Grouped"
          @click="setGrouped(true)"
          class="bg-yellow-500 hover:bg-yellow-400"
        />
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
    <Button title="Close" v-on:click="closePosition" class="py-1.5" />

    <button class="vfm__close" @click="closeInfo.show_modal = false">X</button>
  </vue-final-modal>
</template>

<script>
import Select from "../../components/Select.vue";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";
import Table from "../../components/Table.vue";

import {
  getPosition,
  addPosition,
  closePosition,
} from "../../services/positions";

import { useToast } from "vue-toastification";

export default {
  name: "PositionActive",
  components: {
    Select,
    Input,
    Button,
    Table,
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
      selectKeys: ["id", "name"],
      active_positions: null,
      assets: null,
      grouped: false,
      newPosition: {
        buy_amount: null,
        buy_asset_id: null,
        sell_amount: null,
        sell_asset_id: null,
      },
      closeInfo: {
        amount: 0,
        id: 0,
        show_modal: false,
      },
    };
  },
  async mounted() {
    this.assets = await this.getAllAssets();
    await this.refreshActivePositions();
  },
  methods: {
    async refreshActivePositions() {
      this.active_positions = await getPosition({ grouped: this.grouped });
    },
    showClosePosition(data) {
      this.closeInfo.show_modal = true;
      this.closeInfo.id = data.id;
    },
    async setGrouped(bool) {
      this.grouped = bool;
      await this.refreshActivePositions();
    },
    async getAllAssets() {
      let res = await axios.get("/api/assets");

      return res.data;
    },
    async addPosition() {
      let result = await addPosition(this.newPosition);

      if (result.status === 200) {
        this.toast.success(result.message);
        await this.refreshActivePositions();
      } else {
        this.toast.error(result.message);
      }
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

        await this.refreshActivePositions();
      } else {
        this.toast.error(result.message);
      }
    },
  },
};
</script>
