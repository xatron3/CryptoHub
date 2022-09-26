<template>
  <Input
    :showLabel="true"
    name="coingecko_id"
    type="text"
    placeholder="Coingecko ID"
    :value="this.coingecko_id"
    v-model="this.coingecko_id"
    v-on:keyup="getCoinList"
  />

  <div
    v-if="this.coins.length > 0"
    class="h-40 overflow-y-scroll overflow-x-hidden rounded-md bg-gray-100 p-2"
  >
    <div
      v-for="coin in this.coins"
      v-bind:key="coin.id"
      @click="setCoingeckoId(coin.id)"
      class="hover:bg-gray-300 cursor-pointer"
    >
      {{ coin.name }}
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
    this.coin_list = await getCoingeckoList();
  },
  methods: {
    getCoinList() {
      this.coins = [];

      if (this.coingecko_id.length >= 3) {
        this.coins = [];

        this.coin_list.filter((o) => {
          if (o.id.indexOf(this.coingecko_id) !== -1) {
            this.coins.push(o);
          }
        });
      }
    },
    setCoingeckoId(id) {
      this.coins = [];
      this.$emit("inputUpdate", id);
    },
  },
};
</script>
