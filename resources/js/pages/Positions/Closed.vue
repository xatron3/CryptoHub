<template>
  <div>
    <div v-if="this.closed_positions" class="max-w-4xl mt-5 space-y-2">
      <h2 class="text-lg font-bold">Closed Positions</h2>
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
  },
};
</script>
