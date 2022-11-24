<template>
  <Modal v-model="show" @closed="$emit('hideModal')" class="exportModal">
    <template v-slot:title>Export Positions</template>

    <div v-if="jsonData">
      Export
      <span class="text-yellow-500">{{ jsonData.length }}</span> a total
      positions
      <div class="mt-3 bg-gray-600 p-4 rounded-lg overflow-clip">
        <pre>
      {{ cleanData(jsonData) }}
      </pre
        >
      </div>
    </div>
  </Modal>
</template>

<script>
export default {
  props: ["show", "jsonData"],
  name: "ExportModal",
  data() {},
  methods: {
    cleanData(data) {
      let tmp = [];

      data.forEach((pos) => {
        tmp.push({
          buy_asset_symbol: pos.buy_asset_symbol,
          buy_amount: pos.buy_amount,
          sell_asset_symbol: pos.sell_asset_symbol,
          sell_amount: pos.sell_amount,
        });
      });

      return tmp;
    },
  },
};
</script>

<style>
.exportModal .vfm__container .vfm__content {
  max-width: 1000px !important;
}
</style>
