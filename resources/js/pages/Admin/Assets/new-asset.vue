<template>
  <div class="max-w-xl space-y-2">
    <HeaderText>Add Asset</HeaderText>
    <div class="">
      <Providers
        :providers="this.providers"
        @updateProvider="setProvider($event)"
      />
    </div>

    <div class="space-y-2 flex flex-col" v-if="this.assetData.provider !== ''">
      <div class="grid grid-cols-2 space-x-2">
        <!-- Data Providers -->
        <div>
          <CoingeckoInput
            @inputUpdate="setProviderId"
            v-model="this.assetData.provider_id"
            v-if="this.assetData.provider === 'coingecko'"
          />
          <Input
            :showLabel="true"
            name="provider_id"
            autocomplete="off"
            type="text"
            placeholder="Provider ID"
            :value="this.assetData.provider_id"
            v-model="this.assetData.provider_id"
            v-else
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
import Providers from "./components/Providers.vue";
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
      providers: [
        {
          name: "Coingecko",
          id: "coingecko",
        },
        {
          name: "None",
          id: "none",
        },
      ],
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  components: { CoingeckoInput, Providers },
  methods: {
    setProviderId(data) {
      this.assetData.provider_id = data;
    },
    setProvider(data) {
      this.assetData.provider = data;
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
