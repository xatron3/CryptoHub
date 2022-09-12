<template>
  <div class="space-y-2 max-w-sm">
    <div class="flex space-x-2">
      <Input
        v-model="this.sell_amount"
        :value="this.sell_amount"
        id="sell_amount"
        name="buy_amount"
        placeholder="Sell amount"
      />

      <Select
        :items="this.assets"
        :keys="selectKeys"
        v-if="this.assets !== null"
        v-model="this.sell_asset_id"
        class="h-11 self-end"
      />
    </div>

    <div class="flex space-x-2">
      <Input
        v-model="this.buy_amount"
        :value="this.buy_amount"
        id="buy_amount"
        name="buy_amount"
        placeholder="Buy amount"
      />

      <Select
        :items="this.assets"
        :keys="selectKeys"
        v-if="this.assets !== null"
        v-model="this.buy_asset_id"
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

      <div class="flex items-center space-x-2">
        <span>Close Amount</span>
        <Input
          v-model="close_amount"
          :value="close_amount"
          name="close_amount"
          id="close_amount"
          type="number"
        />
      </div>
    </div>
    <Table
      :items="this.active_positions"
      :columns="key_columns"
      @button_clicked="closePosition"
    />
  </div>
</template>

<script>
import Select from "../../components/Select.vue";
import Input from "../../components/Input.vue";
import Button from "../../components/Button.vue";
import Table from "../../components/Table.vue";
export default {
  name: "PositionActive",
  components: {
    Select,
    Input,
    Button,
    Table,
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
      assets: null,
      selectKeys: ["id", "name"],
      buy_amount: null,
      buy_asset_id: null,
      sell_amount: null,
      sell_asset_id: null,
      grouped: false,
      close_amount: 0,
    };
  },
  async mounted() {
    this.assets = await this.getAllAssets();
    this.active_positions = await this.getAllPostions();
  },
  methods: {
    async closePosition(data) {
      if (this.close_amount > 0) {
        let res = await axios.post("/api/position/close", {
          id: data.id,
          close_amount: this.close_amount,
        });

        this.active_positions = await this.getAllPostions();
      } else {
        console.log("Fill");
      }
    },
    async getAllAssets() {
      let res = await axios.get("/api/assets");

      return res.data;
    },
    async getAllPostions(closed = false) {
      var result;

      let res = await axios.get("/api/positions", {
        params: {
          grouped: this.grouped,
          closed: closed,
        },
      });

      if (res.data.data) {
        result = res.data.data;
      } else {
        result = res.data;
      }

      return result;
    },
    async addPosition() {
      try {
        let res = await axios.post("/api/position/add", {
          buy_amount: this.buy_amount,
          buy_asset_id: this.buy_asset_id,
          sell_amount: this.sell_amount,
          sell_asset_id: this.sell_asset_id,
        });

        this.active_positions = await this.getAllPostions();
      } catch (error) {
        console.log(error);
      }
    },
    async setGrouped(bool) {
      this.grouped = bool;
      this.active_positions = await this.getAllPostions();
    },
  },
};
</script>
