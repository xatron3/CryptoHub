<template>
  <div class="max-w-6xl flex flex-col space-y-2">
    <div>
      <Button title="Update Coingecko" @click="updateCoingeckoPrice" />
    </div>
  </div>
</template>

<script>
import { updateCoingeckoPrice } from "@/services/commands";

export default {
  name: "Commands",
  data() {
    return {};
  },
  async mounted() {},
  methods: {
    async updateCoingeckoPrice() {
      const res = await updateCoingeckoPrice();

      console.log(res);
    },
  },
  components: {},
};
</script>
