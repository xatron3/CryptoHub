import { getAssets } from "../../services/assets";

const assets = {
  namespaced: true,
  state: () => ({
    updated: null,
    assets: {},
    sorting: "marketcap",
    limit: 20, // How many per page
    page: 1, // Current asset page
  }),
  mutations: {
    setAssets(state, data) {
      state.updated = Date.now();
      state.assets = data;
    },
    setPage(state, page) {
      state.page = page;
    },
    setSorting(state, data) {
      state.sorting = data;
    },
    updateAssets(state, data) {
      state.updated = Date.now();

      state.assets.forEach((asset) => {
        let id = asset.id;
        let res = data.find((obj) => obj.id === id);

        asset.current_price = res.current_price;
        asset.market_cap = res.market_cap;
        asset.price_change_24h = res.price_change_24h;
      });
    },
  },
  actions: {
    async load(context) {
      const assets = await getAssets();

      context.commit("setAssets", assets.data);
    },
  },
  getters: {
    lastUpdated: (state) => {
      const date = new Date(state.updated);

      return date.toLocaleString();
    },
    pageInfo: (state) => {
      const totalPages = Math.ceil(state.assets.length / state.limit);

      let info = {
        totalPages: totalPages,
        currentPage: state.page,
      };

      return info;
    },
    currentSorting: (state) => {
      return state.sorting;
    },
    all: (state) => {
      return state.assets;
    },
    allFiltered: (state) => {
      if (state.sorting === "marketcap") {
        state.assets.sort(function (a, b) {
          return b.market_cap - a.market_cap;
        });
      }

      if (state.sorting === "gainers") {
        state.assets.sort(function (a, b) {
          return b.price_change_24h - a.price_change_24h;
        });
      }

      if (state.sorting === "loosers") {
        state.assets.sort(function (a, b) {
          return a.price_change_24h - b.price_change_24h;
        });
      }
      const currentIndex = state.page * state.limit;

      const start = currentIndex - state.limit;
      const end = currentIndex;

      return state.assets.slice(start, end);
    },
    get: (state) => (id) => {
      if (typeof id === "string")
        return state.assets.find((asset) => asset.symbol === id);

      return state.assets.find((asset) => asset.id === id);
    },
  },
};

export default assets;
