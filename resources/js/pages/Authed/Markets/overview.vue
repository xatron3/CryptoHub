<template>
  <div class="flex flex-col space-y-2">
    <div class="text-xs ml-auto">
      Last Updated: {{ this.$store.getters["assets/lastUpdated"] }}
    </div>

    <div class="w-full flex space-x-2">
      <div class="w-full md:w-2/5">
        <h2 class="text-lg font-bold dark:text-white">24h Gainers</h2>
        <Table
          :items="gainers"
          :headers="headers"
          :key="this.$store.getters['assets/all']"
        />
      </div>
      <div class="w-full md:w-2/5">
        <h2 class="text-lg font-bold dark:text-white">24h Loosers</h2>
        <Table
          :items="loosers"
          :headers="headers"
          :key="this.$store.getters['assets/all']"
        />
      </div>
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
        { title: "Name", value: "name", format: "name" },
        { title: "Price", value: "current_price", format: "price" },
        { title: "24H", value: "price_change_24h", format: "percentage" },
      ],
    };
  },
};
</script>
