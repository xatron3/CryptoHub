<template>
  <div class="flex flex-col">
    <!-- <div>
      <h2 class="text-2xl font-bold my-3">Latest News</h2>
      <div
        class="flex space-x-0 space-y-2 flex-col md:space-y-0 md:space-x-3 md:flex-row"
      >
        <Card />
        <Card />
        <Card />
      </div>
    </div> -->

    <div v-if="this.assets">
      <h2 class="text-2xl font-semibold my-3 h-font uppercase">
        Today's Top Cryptocurrencies
      </h2>

      <AssetsTable
        :assets="this.assets"
        v-if="Object.keys(this.assets).length > 0"
      />
    </div>
  </div>
</template>

<script>
import Card from "./card/index.vue";
import AssetsTable from "./table/assets.vue";
import { getAssets } from "@/services/assets";

export default {
  name: "Home",
  components: {
    Card,
    AssetsTable,
  },
  data() {
    return {
      assets: {},
      sort: "",
    };
  },
  async mounted() {
    this.assets = this.$store.getters["assets/marketcap"];
  },
  methods: {},
};
</script>
