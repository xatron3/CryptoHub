<template>
  <vue-final-modal v-model="show" @closed="$emit('hideModal')">
    <div class="flex items-center space-x-2">
      <span>Close Amount</span>
      <Input
        v-model="amount"
        :value="amount"
        name="close_amount"
        id="close_amount"
        type="number"
      />
    </div>
    <Button title="Close" @click="closePosition" class="py-1.5" />

    <button class="vfm__close" @click="$emit('hideModal')">X</button>
  </vue-final-modal>
</template>

<script>
export default {
  props: ["show", "id"],
  name: "ClosePosition",
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    async closePosition() {
      if (this.closeInfo.amount === 0) {
        this.toast.error("Enter a close amount");
        return;
      }

      if (this.closeInfo.id === 0) {
        this.toast.error("Error with getting position ID");
        return;
      }

      let result = await closePosition(amount, this.id);

      if (result.status === 200) {
        this.toast.success(`Successfully closed position`);

        this.closeInfo.show_modal = false;
        this.closeInfo.amount = 0;
        this.closeInfo.id = 0;

        this.$emit("refreshPositions");
      } else {
        this.toast.error(result.message);
      }
    },
  },
};
</script>
