<template>
  <h3 class="text-xs uppercase font-semibold mb-1">Choose Data Provider</h3>

  <div class="space-x-2">
    <Button
      v-for="provider in this._providers"
      v-bind:key="provider.name"
      :title="provider.name"
      @click="updateProvider(provider.id)"
    />
    <!-- <Button
      title="Other"
      :class="{ 'bg-green-400': this.assetData.provider === 'other' }"
      @click="this.assetData.provider = 'other'"
    /> -->
  </div>
</template>

<script>
export default {
  props: ["providers"],
  data() {
    return {
      _providers: "",
      selected: "",
    };
  },
  mounted() {
    this._providers = this.providers;
  },
  methods: {
    updateProvider(provider) {
      this.selected = provider;
      this.$emit("updateProvider", provider);
    },
  },
};
</script>

<style></style>
