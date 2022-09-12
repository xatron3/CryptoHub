<template>
  <div>
    <div v-if="this.closed_positions" class="max-w-4xl mt-5 space-y-2">
      <h2 class="text-lg font-bold">Closed Positions</h2>
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
      <Table
        :items="this.closed_positions"
        :columns="key_columns"
        @button_clicked="closePosition"
      />
    </div>
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
      key_columns: ["sell_amount", "buy_amount", "close_amount", "profit"],
      closed_positions: null,
      grouped: false,
    };
  },
  async mounted() {
    this.closed_positions = await this.getAllPostions(true);
  },
  methods: {
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
    async setGrouped(bool) {
      this.grouped = bool;
      this.closed_positions = await this.getAllPostions(true);
    },
  },
};
</script>
