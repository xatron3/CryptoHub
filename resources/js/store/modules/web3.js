import { getProvider } from "../../helpers/web3";

const web3 = {
  namespaced: true,
  state: () => ({
    loaded: false,
    provider: null,
    wallet: "",
  }),
  mutations: {
    setWallet(state, data) {
      state.wallet = data;
    },
    setLoaded(state, bool) {
      state.loaded = bool;
    },
    setProvider(state, provider) {
      state.provider = provider;
    },
  },
  getters: {
    isLoaded(state, getters) {
      return state.loaded;
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
      await context.commit("setLoaded", true);
    },
    async setProvider(context, provider) {
      const _provider = await getProvider();
      context.state.provider = _provider;

      if (provider !== undefined) {
        await context.commit("setLoaded", true);
      } else {
        await context.commit("setLoaded", false);
      }
    },
  },
};

export default web3;
