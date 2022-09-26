<template>
  <div class="max-w-6xl flex flex-col space-y-2">
    <div class="flex justify-end space-x-2">
      <Button
        @click="$router.push('/admin/assets/new')"
        title="Add New"
        class="w-28 self-end"
      />
    </div>

    <Table
      :columns="this.columns"
      :items="this.assets"
      buttonTitle="Edit"
      @button_clicked="test"
    />
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import { getAssets } from "@/services/assets";

export default {
  name: "Assets",
  data() {
    return {
      assets: null,
      columns: ["name", "symbol", "current_price", "button"],
    };
  },
  async mounted() {
    this.assets = await getAssets({ sort_by: "name" });
  },
  methods: {
    test(data) {
      console.log(data.id);
    },
  },
  components: { Table },
};
</script>
