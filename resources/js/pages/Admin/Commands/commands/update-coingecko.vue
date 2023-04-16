<template>
  <div>
    <Button title="Update Coingecko" @click="updateCoingeckoPrice" />
  </div>
</template>

<script>
import { updateCoingeckoPrice } from "@/services/commands";
import { useToast } from "vue-toastification";

export default {
  name: "UpdateCoingecko",
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    async updateCoingeckoPrice() {
      const result = await updateCoingeckoPrice();

      if (result.data.status === 200) {
        await this.$store.dispatch("assets/load");
        await this.$store.dispatch("positions/getPositions");
        this.toast.success("Coingecko price updated");
      } else {
        this.toast.error(
          `Error updating coingecko price ${result.data.message}`
        );
      }
    },
  },
  components: {},
};
</script>
