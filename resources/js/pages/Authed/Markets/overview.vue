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
    this.gainers = this.$store.getters["assets/gainers"].splice(0, 10);
    this.loosers = this.$store.getters["assets/loosers"].splice(0, 10);
  },
};
</script>
