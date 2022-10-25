import { getAssets } from "../../services/assets";

const assets = {
  namespaced: true,
  state: () => ({
    assets: {},
  }),
  mutations: {
    setAssets(state, data) {
      state.assets = data;
    },
  },
  actions: {
    async load(context, data) {
      const assets = await getAssets();

      context.commit("setAssets", assets.data);
      console.log("T");
    },
  },
  getters: {
    all: (state) => state.assets,
    get: (state) => (id) => [...state.assets].find((x) => x.id === id),
    gainers: (state) =>
      [...state.assets].sort(function (a, b) {
        return b.price_change_24h - a.price_change_24h;
      }),
    loosers: (state) =>
      [...state.assets].sort(function (a, b) {
        return a.price_change_24h - b.price_change_24h;
      }),
  },
};

export default assets;
