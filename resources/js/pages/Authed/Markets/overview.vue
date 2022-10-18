<template>
  <div class="flex space-x-4">
    <div class="w-full md:w-1/3">
      <h2 class="text-lg font-bold dark:text-white">24h Gainers</h2>
      <Table :items="this.gainers" :columns="columns" />
    </div>
    <div class="w-full md:w-1/3">
      <h2 class="text-lg font-bold dark:text-white">24h Loosers</h2>
      <Table :items="this.loosers" :columns="columns" />
    </div>
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
      gainers: null,
      loosers: null,
      columns: ["name", "current_price", "price_change_24h"],
    };
  },
  async mounted() {
    this.getUpdatedData();

    setInterval(this.getUpdatedData, 60000);
  },
  methods: {
    async getUpdatedData() {
      const gainers = await getAssets({
        sort_by: "price_change",
        limit: 10,
      });

      this.gainers = gainers.data;

      const loosers = await getAssets({
        sort_by: "price_change",
        sort_order: "desc",
        limit: 10,
      });

      this.loosers = loosers.data;
    },
  },
};
</script>
