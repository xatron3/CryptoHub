<template>
  <div class="max-w-xl">
    <div class="space-y-2 flex flex-col">
      <div class="grid grid-cols-2 space-x-2">
        <div class="">
          <!-- <Select
            :items="this.$store.getters['assets/all']"
            :keys="['id', 'symbol']"
            v-model="this.assetData.proivder"
            :value="this.assetData.proivder"
            class="h-11 self-end"
          /> -->
          <CoingeckoInput @inputUpdate="setProviderId" />
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
