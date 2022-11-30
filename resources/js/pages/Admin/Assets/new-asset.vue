<template>
  <div class="max-w-xl space-y-2">
    <h2 class="text-2xl font-semibold uppercase h-font">Add Asset</h2>
    <div class="">
      <h3 class="text-xs uppercase font-semibold mb-1">Choose Data Provider</h3>

      <div class="space-x-2">
        <Button
          title="Coingecko"
          :class="{ 'bg-green-400': this.assetData.provider === 'coingecko' }"
          @click="this.assetData.provider = 'coingecko'"
        />
        <Button
          title="Other"
          :class="{ 'bg-green-400': this.assetData.provider === 'other' }"
          @click="this.assetData.provider = 'other'"
        />
      </div>
    </div>

    <div class="space-y-2 flex flex-col" v-if="this.assetData.provider !== ''">
      <div class="grid grid-cols-2 space-x-2">
        <!-- Data Providers -->
        <div>
          <CoingeckoInput
            @inputUpdate="setProviderId"
            v-if="this.assetData.provider === 'coingecko'"
          />
        </div>

        <Input
          :showLabel="true"
          name="logo"
          autocomplete="off"
          type="text"
          placeholder="Logo"
          :value="this.assetData.logo"
          v-model="this.assetData.logo"
        />
      </div>
      <div class="grid grid-cols-2 space-x-2">
        <Input
          :showLabel="true"
          name="name"
          autocomplete="off"
          type="text"
          placeholder="Name"
          :value="this.assetData.name"
          v-model="this.assetData.name"
        />

        <Input
          :showLabel="true"
          name="symbol"
          autocomplete="off"
          type="text"
          placeholder="Symbol"
          :value="this.assetData.symbol"
          v-model="this.assetData.symbol"
        />
      </div>

      <div class="self-end">
        <Button title="Add Asset" @click="addNewAsset()" />
      </div>
    </div>
  </div>
</template>

<script>
import Alert from "@/components/Alert.vue";

import CoingeckoInput from "./components/CoingeckoInput.vue";

import { useToast } from "vue-toastification";

export default {
  name: "AddNewAsset",
  data() {
    return {
      assetData: {
        name: "",
        logo: "",
        symbol: "",
        provider: "",
        provider_id: "",
      },
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  components: { Alert, CoingeckoInput },
  methods: {
    test(data) {
      console.log(data);
    },
    setProviderId(data) {
      this.assetData.provider_id = data;
    },
    async addNewAsset() {
      let res = await axios.post("/api/asset/add", this.assetData);

      if (res.data.status === 200) {
        this.toast.success(res.data.message);
        this.$router.push("/admin/assets");
      } else {
        this.toast.error(res.data.message);
      }
    },
  },
};
</script>
