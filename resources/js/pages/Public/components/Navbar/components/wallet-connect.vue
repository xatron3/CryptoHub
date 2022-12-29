<template>
  <div>
    <div v-if="!this.$store.getters['web3/wallet']">
      <button
        @click="walletConnect"
        class="inline-block text-sm px-4 py-2 leading-none transition-all border rounded text-white border-white hover:bg-gray-100 dark:hover:bg-gray-900 mt-4 lg:mt-0"
      >
        Connect Wallet
      </button>
    </div>
    <div class="flex items-center space-x-2" v-else>
      <div
        class="w-28 overflow-hidden rounded-lg bg-gray-400 text-white dark:bg-gray-800 px-4 py-2 text-sm text-ellipsis"
      >
        <span class="overflow-hidden">{{
          this.$store.getters["web3/wallet"]
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async walletConnect() {
      if (window.ethereum) {
        await this.$store.getters["web3/provider"].send(
          "eth_requestAccounts",
          []
        );

        const signer = this.$store.getters["web3/provider"].getSigner();
        const address = await signer.getAddress();
        this.$store.dispatch("web3/setWallet", address);
      }
    },
  },
};
</script>

<style></style>
