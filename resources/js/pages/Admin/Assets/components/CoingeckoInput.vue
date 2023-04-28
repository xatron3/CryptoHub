<template>
  <div class="relative">
    <Input
      :showLabel="true"
      name="coingecko_id"
      autocomplete="off"
      type="text"
      placeholder="Coingecko ID"
      :value="this.coingecko_id"
      v-model="this.coingecko_id"
      v-on:keyup="getCoinList"
    />

    <div
      v-if="this.coins.length > 0"
      class="h-40 overflow-y-scroll w-full z-10 absolute overflow-x-hidden rounded-md bg-gray-100 dark:bg-gray-500 dark:text-white p-2"
    >
      <div
        v-for="coin in this.coins"
        v-bind:key="coin.id"
        @click="setCoingeckoId(coin.id)"
        class="hover:bg-gray-300 dark:hover:bg-gray-700 cursor-pointer py-0.5 pl-1 rounded-md"
      >
        {{ coin.name }} ({{ coin.symbol }})
      </div>
    </div>
  </div>
</template>

<script>
import { getCoingeckoList } from "@/services/assets";

export default {
  data() {
    return {
      coingecko_id: null,
      coins: [],
      coin_list: null,
    };
  },
  async mounted() {
    const result = await getCoingeckoList();

    this.coin_list = result.data;
  },
  methods: {
    getCoinList() {
      this.coins = [];

      if (this.coingecko_id.length >= 3) {
        this.coins = [];

        this.coin_list.filter((o) => {
          var name = o.name.toLowerCase();

          if (name.indexOf(this.coingecko_id.toLowerCase()) !== -1) {
            this.coins.push(o);
          }
        });
      }
    },
    setCoingeckoId(id) {
      this.coins = [];
      this.coingecko_id = id;
      this.$emit("inputUpdate", id);
    },
  },
};
</script>
