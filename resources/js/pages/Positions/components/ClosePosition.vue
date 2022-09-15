<template>
  <vue-final-modal v-model="show" @closed="$emit('hideModal')">
    <div class="space-y-2">
      <Input
        v-model="amount"
        :value="amount"
        name="close_amount"
        id="close_amount"
        type="number"
        placeholder="Close Amount"
      />

      <Button
        title="Close Position"
        @click="closePosition"
        class="py-1.5 w-full"
      />
    </div>

    <button class="vfm__close" @click="$emit('hideModal')">X</button>
  </vue-final-modal>
</template>

<script>
import { useToast } from "vue-toastification";
import { closePosition } from "@/services/positions";

export default {
  props: ["show", "id"],
  name: "ClosePosition",
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      amount: 0,
    };
  },
  methods: {
    async closePosition() {
      if (this.amount === 0) {
        this.toast.error("Enter a close amount");
        return;
      }

      if (this.id === 0) {
        this.toast.error("Error with getting position ID");
        return;
      }

      let result = await closePosition({ amount: this.amount, id: this.id });

      if (result.status === 200) {
        this.toast.success(`Successfully closed position`);

        this.amount = 0;

        this.$emit("hideModal");
        this.$emit("refreshPositions");
      } else {
        this.toast.error(result.message);
      }
    },
  },
};
</script>
