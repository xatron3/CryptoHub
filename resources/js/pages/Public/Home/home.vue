<template>
  <div class="flex flex-col">
    <div>
      <h2 class="text-2xl font-bold mt-3 mb-2 uppercase">Latest News</h2>
      <div
        class="flex space-x-0 space-y-2 flex-col md:space-y-0 md:space-x-3 md:flex-row"
      >
        <Card />
        <Card />
        <Card />
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold my-2 h-font uppercase">
        Today's Top Cryptocurrencies
      </h2>

      <AssetsTable />
    </div>
  </div>
</template>

<script>
import Card from "./card/index.vue";
import AssetsTable from "./table/assets.vue";
import { useHead } from "@vueuse/head";

export default {
  name: "Home",
  components: {
    Card,
    AssetsTable,
  },
  setup() {
    useHead({
      meta: [
        {
          name: "description",
          content:
            "Latest crypto prices always up to date. Find your new top project today.",
        },
      ],
    });
  },
  data() {
    return {
      sort: "",
    };
  },
  methods: {},
};
</script>
