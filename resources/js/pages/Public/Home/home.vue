<template>
  <div class="flex flex-col">
    <div class="mt-4">
      <div
        class="flex space-x-0 space-y-2 flex-col md:space-y-0 md:space-x-3 md:flex-row h-48"
      >
        <GainersCard v-bind:key="this.$store.getters['assets/all']" />
        <LoosersCard v-bind:key="this.$store.getters['assets/all']" />
        <NewsCard />
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
import GainersCard from "./card/gainers-card.vue";
import LoosersCard from "./card/loosers-card.vue";
import NewsCard from "./card/news-card.vue";
import AssetsTable from "./table/assets.vue";
import { useHead } from "@vueuse/head";

export default {
  name: "Home",
  components: {
    NewsCard,
    AssetsTable,
    GainersCard,
    LoosersCard,
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
