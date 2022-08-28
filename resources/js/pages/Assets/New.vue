<template>
  <div class="max-w-xl">
    <div class="space-y-2 flex flex-col">
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

      <div class="self-end">
        <Button title="Add Asset" @click="addNewAsset()" />
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "../../helpers/cookie";
import Button from "../../components/Button.vue";
import Input from "../../components/Input.vue";
import Button1 from "../../components/Button.vue";

export default {
  name: "AddNewAsset",
  data() {
    return {
      coingecko_id: null,
      coins: [],
      coin_list: null,
    };
  },
  async mounted() {
    let res = await axios.get("https://api.coingecko.com/api/v3/coins/list");

    this.coin_list = res.data;
  },
  components: { Button, Input },
  methods: {
    async getAssets() {
      const token = cookie.getCookie("access_token");
      let res = await axios.get("/api/assets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    },
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
      this.coingecko_id = id;
    },
    async addNewAsset() {
      const token = cookie.getCookie("access_token");
      let res = await axios.post(
        "/api/assets/add",
        {
          coingecko_id: this.coingecko_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      this.$router.push("/admin/assets");
    },
  },
};
</script>
