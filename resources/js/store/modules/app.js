const app = {
  namespaced: true,
  state: () => ({
    loaded: false,
    viewType: "public",
    settings: {
      showNavigation: true,
    },
  }),
  mutations: {
    setViewType(state, data) {
      state.viewType = data;
    },
    setLoaded(state, bool) {
      state.loaded = bool;
    },
    toggleNavigation(state) {
      state.settings.showNavigation = !state.settings.showNavigation;
    },
  },

  getters: {
    isLoaded(state, getters) {
      return state.loaded;
    },
  },
  actions: {
    async loadAppData({ dispatch, commit }) {
      await dispatch("web3/setProvider", null, { root: true });
      await dispatch("assets/load", null, { root: true });
      await dispatch("user/getUserData", null, { root: true });
      commit("setLoaded", true);
    },
  },
};

export default app;
