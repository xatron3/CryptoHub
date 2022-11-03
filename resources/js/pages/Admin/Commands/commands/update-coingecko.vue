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
      await updateCoingeckoPrice();
      await this.$store.dispatch("assets/load");
      this.toast.success("Coingecko price updated");
    },
  },
  components: {},
};
</script>
