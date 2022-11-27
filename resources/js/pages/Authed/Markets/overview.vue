<template>
  <div class="flex space-x-4">
    <div class="w-full md:w-2/5">
      <h2 class="text-lg font-bold dark:text-white">24h Gainers</h2>
      <Table :items="this.gainers" :headers="headers" />
    </div>
    <div class="w-full md:w-2/5">
      <h2 class="text-lg font-bold dark:text-white">24h Loosers</h2>
      <Table :items="this.loosers" :headers="headers" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Markets",
  components: {},
  data() {
    return {
      gainers: null,
      loosers: null,
      headers: [
        { title: "Name", value: "name" },
        { title: "Price", value: "current_price", format: "price" },
        { title: "24H", value: "price_change_24h", format: "percentage" },
      ],
    };
  },
  async mounted() {
    this.gainers = this.$store.getters["assets/gainers"].splice(0, 10);
    this.loosers = this.$store.getters["assets/loosers"].splice(0, 10);
  },
};
</script>
