<template>
  <div class="max-w-6xl flex flex-col space-y-2">
    <div class="flex justify-end space-x-2">
      <Button
        @click="updatePrices()"
        title="Update Prices"
        class="bg-yellow-500 self-end w-36"
      />

      <Button
        @click="$router.push('/admin/assets/new')"
        title="Add New"
        class="w-28 self-end"
      />
    </div>

    <Table :columns="this.columns" :items="this.assets" />
  </div>
</template>

<script>
import Table from "../../components/Table.vue";
import Button from "../../components/Button.vue";

export default {
  name: "Assets",
  data() {
    return {
      assets: null,
      columns: ["name", "symbol", "current_price", "edit"],
    };
  },
  async mounted() {
    this.assets = await this.getAssets();
  },
  methods: {
    async getAssets() {
      let res = await axios.get("/api/assets");

      return res.data;
    },
    async updatePrices() {
      let res = await axios.get("/api/update-coingecko");

      this.assets = await this.getAssets();
    },
  },
  components: { Table, Button },
};
</script>
