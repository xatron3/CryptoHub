<template>
  <div class="max-w-6xl flex flex-col space-y-2">
    <Button
      @click="$router.push('/admin/assets/new')"
      title="Add New"
      class="w-28 self-end"
    />

    <Table
      :columns="this.columns"
      :items="this.assets"
      editUrl="/asset/edit/"
    />
  </div>
</template>

<script>
import cookie from "../../helpers/cookie";
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
      const token = cookie.getCookie("access_token");
      let res = await axios.get("/api/assets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
  },
  components: { Table, Button },
};
</script>
