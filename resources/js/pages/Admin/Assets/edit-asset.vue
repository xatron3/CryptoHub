<template>
  <div class="max-w-xl" v-if="this.asset">
    <div class="space-y-2 flex flex-col">
      <div class="grid grid-cols-2 space-x-2">
        <!-- Coingecko ID -->
        <Input
          :showLabel="true"
          disabled="true"
          name="provider_id"
          autocomplete="off"
          type="text"
          placeholder="Coingecko ID"
          :value="this.asset.provider_id"
          v-model="this.asset.provider_id"
        />

        <!-- Asset ID -->
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

      <!-- Row -->
      <div class="grid grid-cols-2 space-x-2">
        <!-- Asset Name -->
        <Input
          :showLabel="true"
          name="name"
          autocomplete="off"
          type="text"
          placeholder="Name"
          :value="this.asset.name"
          v-model="this.asset.name"
        />

        <!-- Asset Symbol -->
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

      <!-- Row -->
      <div class="grid grid-cols-2 space-x-2">
        <!-- Logo -->
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
  components: { CoingeckoInput },
  async mounted() {
    this.asset = this.$store.getters["assets/get"](
      parseInt(this.$route.params.id)
    );
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
