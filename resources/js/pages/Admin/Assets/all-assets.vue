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
        :items="this.$store.getters['assets/allFiltered']"
        :meta="this.meta"
        @button_clicked="edit_asset"
        @change_page="change_page"
      />

      <div class="text-xs my-1 self-start">
        Showing page
        {{ this.$store.getters["assets/pageInfo"].currentPage }} out of
        {{ this.$store.getters["assets/pageInfo"].totalPages }}
      </div>

      <div class="mt-3 mx-auto rounded-md overflow-hidden flex justify-center">
        <div
          v-for="index in this.$store.getters['assets/pageInfo'].totalPages"
          v-bind:key="index"
          class="px-2 py-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-900 transition-all"
          :class="{
            'bg-gray-200 dark:bg-gray-600':
              this.$store.getters['assets/pageInfo'].currentPage === index,
            'bg-gray-100 dark:bg-gray-700':
              this.$store.getters['assets/pageInfo'].currentPage !== index,
          }"
          v-on:click="this.$store.commit('assets/setPage', index)"
        >
          <span>{{ index }}</span>
        </div>
      </div>
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
      headers: [
        {
          title: "Name",
          value: "name",
          format: "name",
        },
        {
          title: "Provider",
          value: "provider",
        },
        {
          title: "Edit",
          value:
            "<div class='bg-green-500 text-white hover:bg-green-600 transition-all px-3 py-2 rounded-md inline-flex cursor-pointer'>Edit</div>",
          customValue: true,
        },
      ],
      columns: ["name", "symbol", "current_price", "button"],
    };
  },
  methods: {
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
