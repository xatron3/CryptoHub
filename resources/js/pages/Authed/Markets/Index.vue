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
      columns: ["name", "symbol", "current_price", "market_cap"],
    };
  },
  async mounted() {
    this.assets = await getAssets({ sort_by: "market_cap" });
  },
};
</script>
