<template>
  <div class="w-1/2">
    <Table :items="this.assets" :columns="columns" />
  </div>
</template>

<script>
import { getAssets } from "@/services/assets";
import Table from "@/components/Table.vue";

export default {
  name: "Markets",
  components: {
    Table,
  },
  data() {
    return {
      assets: null,
      columns: [
        "name",
        "symbol",
        "current_price",
        "price_change_24h",
        "market_cap",
      ],
    };
  },
  async mounted() {
    this.getUpdatedData();

    setInterval(this.getUpdatedData, 60000);
  },
  methods: {
    async getUpdatedData() {
      this.assets = await getAssets({
        sort_by: "price_change",
        sort_order: "desc",
      });
    },
  },
};
</script>
