import { getProvider } from "../../helpers/web3";

const web3 = {
  namespaced: true,
  state: () => ({
    chainId: 0,
    provider: null,
    wallet: "",
  }),
  mutations: {
    setWallet(state, data) {
      state.wallet = data;
    },
    setChainId(state, data) {
      state.chainId = data;
    },
    setProvider(state, provider) {
      state.provider = provider;
    },
  },
  getters: {
    chainId(state) {
      return state.chainId;
    },
    provider(state) {
      return state.provider;
    },
    wallet(state) {
      return state.wallet;
    },
  },
  actions: {
    async setWallet(context, data) {
      context.state.wallet = data;
    },
    async setProvider(context, provider) {
      const _provider = await getProvider();
      let walletAddress, network;

      if (_provider !== undefined) {
        walletAddress = await _provider.listAccounts();
        network = await _provider.getNetwork();

        context.commit("setWallet", walletAddress[0]);
        context.commit("setChainId", network.chainId);
      }

      context.commit("setProvider", _provider);
    },
  },
};

export default web3;
