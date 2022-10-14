import { createStore } from "vuex";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      settings: {
        showMobileNav: true,
      },
      user: null,
      assets: {
        crypto: null,
      },
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setCryptoAssets(state, assets) {
      state.assets.crypto = assets;
    },
  },
});

export default store;
