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
      <Button title="Add position" @click="addPosition" class="mx-auto" />
    </div>
  </div>

  <div v-if="this.positions" class="max-w-4xl mt-5">
    <Table :items="this.positions" :columns="key_columns" />
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
        "sell_asset",
        "buy_amount",
        "buy_asset",
        "price",
        "current_sell_price",
      ],
      positions: false,
      assets: null,
      selectKeys: ["id", "name"],
      buy_amount: null,
      buy_asset_id: null,
      sell_amount: null,
      sell_asset_id: null,
    };
  },
  async mounted() {
    this.assets = await this.getAllAssets();
    this.positions = await this.getAllPostions();
  },
  methods: {
    async getAllAssets() {
      let res = await axios.get("/api/assets");

      return res.data;
    },
    async getAllPostions() {
      let res = await axios.get("/api/positions");

      return res.data.data;
    },
    async addPosition() {
      let res = await axios.post("/api/position/add", {
        buy_amount: this.buy_amount,
        buy_asset_id: this.buy_asset_id,
        sell_amount: this.sell_amount,
        sell_asset_id: this.sell_asset_id,
      });

      console.log(res);
    },
  },
};
</script>
