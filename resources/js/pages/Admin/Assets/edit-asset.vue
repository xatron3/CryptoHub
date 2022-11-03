<template>
  <div class="max-w-xl" v-if="this.asset">
    <div class="space-y-2 flex flex-col">
      <div class="grid grid-cols-2 space-x-2">
        <Input
          :showLabel="true"
          disabled="true"
          name="coingecko_id"
          autocomplete="off"
          type="text"
          placeholder="Coingecko ID"
          :value="this.asset.coingecko_id"
          v-model="this.asset.coingecko_id"
        />

        <Input
          :showLabel="true"
          disabled="true"
          name="asset_id"
          autocomplete="off"
          type="text"
          placeholder="ID"
          :value="this.asset.id"
          v-model="this.asset.id"
        />
      </div>

      <div class="grid grid-cols-2 space-x-2">
        <Input
          :showLabel="true"
          name="name"
          autocomplete="off"
          type="text"
          placeholder="Name"
          :value="this.asset.name"
          v-model="this.asset.name"
        />

        <Input
          :showLabel="true"
          name="symbol"
          autocomplete="off"
          type="text"
          placeholder="Symbol"
          :value="this.asset.symbol"
          v-model="this.asset.symbol"
        />
      </div>

      <div class="grid grid-cols-2 space-x-2">
        <Input
          :showLabel="true"
          name="logo"
          autocomplete="off"
          type="text"
          placeholder="Logo"
          :value="this.asset.logo"
          v-model="this.asset.logo"
        />
      </div>

      <div class="self-end">
        <Button title="Update Asset" @click="updateAsset()" />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";

import CoingeckoInput from "./components/CoingeckoInput.vue";

import { useToast } from "vue-toastification";
import { getAssets, updateAsset } from "@/services/assets";

export default {
  name: "edit-asset",
  data() {
    return {
      asset: null,
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  components: { Alert, CoingeckoInput },
  async mounted() {
    var asset = await getAssets({ id: this.$route.params.id });
    this.asset = asset.data[0];
  },
  methods: {
    async updateAsset() {
      var res = await updateAsset(this.asset);

      if (res.data.status === 200) {
        this.toast.success(res.data.message);
        this.$router.push("/admin/assets");
      } else {
      }
    },
  },
};
</script>
