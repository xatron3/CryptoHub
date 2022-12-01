<template>
  <div>
    <HeaderText>All Assets</HeaderText>

    <div class="max-w-6xl flex flex-col space-y-2">
      <div class="flex">
        <div v-if="this.meta">
          Showing Page {{ this.page }}/{{ this.meta.last_page }}
        </div>
        <div class="ml-auto">
          <Button
            @click="$router.push('/admin/assets/new')"
            title="Add New"
            class="w-28 self-end"
          />
        </div>
      </div>

      <Table
        :headers="this.headers"
        :items="this.assets"
        :meta="this.meta"
        buttonTitle="Edit"
        @button_clicked="edit_asset"
        @change_page="change_page"
      />
    </div>
  </div>
</template>

<script>
import { getAssets } from "@/services/assets";

export default {
  name: "Assets",
  components: {},
  data() {
    return {
      assets: null,
      meta: null,
      page: 1,
      headers: [
        {
          title: "Name",
          value: "name",
        },
      ],
      columns: ["name", "symbol", "current_price", "button"],
    };
  },
  async mounted() {
    this.getAssetData();
  },
  methods: {
    async getAssetData() {
      const assetData = await getAssets({
        sort_by: "name",
        page: this.page,
        paginate: true,
      });

      this.assets = assetData.data;
      this.meta = assetData.meta;
    },
    edit_asset(data) {
      this.$router.push(`/admin/asset/edit/${data.id}`);
    },
    change_page(page) {
      var newPage = xa.setPaginationPage(this.page, page);

      if (this.page !== newPage && newPage <= this.meta.last_page) {
        console.log("test");
        this.page = newPage;
        this.getAssetData();
      }
    },
  },
};
</script>
