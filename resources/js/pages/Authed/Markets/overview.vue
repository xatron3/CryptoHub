<template>
  <div class="flex space-x-4">
    <div class="w-full md:w-2/5">
      <h2 class="text-lg font-bold dark:text-white">24h Gainers</h2>
      <Table :items="gainers" :headers="headers" />
    </div>
    <div class="w-full md:w-2/5">
      <h2 class="text-lg font-bold dark:text-white">24h Loosers</h2>
      <Table :items="loosers" :headers="headers" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Markets",
  components: {},
  computed: {
    loosers() {
      return this.$store.getters["assets/all"]
        .sort(function (a, b) {
          return a.price_change_24h - b.price_change_24h;
        })
        .slice(0, 15);
    },
    gainers() {
      return this.$store.getters["assets/all"]
        .sort(function (a, b) {
          return b.price_change_24h - a.price_change_24h;
        })
        .slice(0, 15);
    },
  },
  data() {
    return {
      headers: [
        { title: "Name", value: "name" },
        { title: "Price", value: "current_price", format: "price" },
        { title: "24H", value: "price_change_24h", format: "percentage" },
      ],
    };
  },
};
</script>
