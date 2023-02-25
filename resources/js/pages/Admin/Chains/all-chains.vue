<template>
  <div class="space-y-2 max-w-6xl flex flex-col">
    <HeaderText>All Chains</HeaderText>

    <Table
      :headers="this.headers"
      :items="this.chains"
      :meta="this.meta"
      @button_clicked="edit_asset"
      @change_page="change_page"
    />
  </div>
</template>

<script>
export default {
  name: "AllChains",
  data() {
    return {
      headers: [
        {
          title: "Name",
          value: "name",
        },
        {
          title: "ID",
          value: "chain_id",
        },
        {
          title: "Edit",
          value:
            "<a href='#' class='bg-green-500 text-white hover:bg-green-600 transition-all px-3 py-2 rounded-md'>Edit</a>", // TODO: Hook too func or smth
          customValue: true,
        },
      ],
      chains: [
        {
          name: "test",
          chain_id: 1,
        },
      ],
    };
  },
};
</script>
