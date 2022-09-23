<template>
  <Modal v-model="show" @closed="$emit('hideModal')">
    <template v-slot:title>New Position</template>
    <div class="space-y-2 max-w-sm mx-auto">
      <div class="flex space-x-2">
        <Input
          v-model="this.newPosition.sell_amount"
          :value="this.newPosition.sell_amount"
          id="sell_amount"
          name="buy_amount"
          placeholder="Sell amount"
        />

        <Select
          :items="this.assets"
          :keys="selectKeys"
          v-model="this.newPosition.sell_asset_id"
          :value="this.newPosition.sell_asset_id"
          class="h-11 self-end"
        />
      </div>

      <div class="flex space-x-2">
        <Input
          v-model="this.newPosition.buy_amount"
          :value="this.newPosition.buy_amount"
          id="buy_amount"
          name="buy_amount"
          placeholder="Buy amount"
        />

        <Select
          :items="this.assets"
          :keys="selectKeys"
          v-model="this.newPosition.buy_asset_id"
          :value="this.newPosition.buy_asset_id"
          class="h-10 self-end"
        />
      </div>

      <div class="flex">
        <Button
          title="Add position"
          @click="addPosition"
          class="mx-auto w-full"
        />
      </div>
    </div>
  </Modal>
</template>

<script>
import { getAssets } from "@/services/assets";
import { addPosition } from "@/services/positions";
import { useToast } from "vue-toastification";

export default {
  props: ["show", "assets"],
  name: "New Position",
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      selectKeys: ["id", "symbol"],
      assets: null,
      newPosition: {
        buy_amount: null,
        buy_asset_id: null,
        sell_amount: null,
        sell_asset_id: null,
      },
    };
  },
  async mounted() {
    this.assets = await getAssets();
  },
  methods: {
    async addPosition() {
      let result = await addPosition(this.newPosition);

      if (result.status === 200) {
        this.toast.success(result.message);

        Object.keys(this.newPosition).forEach(
          (i) => (this.newPosition[i] = null)
        );

        this.$emit("hideModal");
        this.$emit("refreshPositions");
      } else {
        this.toast.error(result.message);
      }
    },
  },
};
</script>
