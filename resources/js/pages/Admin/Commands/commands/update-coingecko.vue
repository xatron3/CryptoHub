<template>
  <div>
    <Button title="Update Coingecko" @click="updateCoingeckoPrice" />
  </div>
</template>

<script>
import { updateCoingeckoPrice } from "@/services/commands";

export default {
  name: "UpdateCoingecko",
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    async updateCoingeckoPrice() {
      await updateCoingeckoPrice();
      await this.$store.dispatch("assets/load");
    },
  },
  components: {},
};
</script>
