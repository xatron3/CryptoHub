const app = {
  namespaced: true,
  state: () => ({
    loaded: false,
    settings: {
      showNavigation: true,
    },
  }),
  mutations: {
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
      await dispatch("user/getUser", null, { root: true });
      await dispatch("assets/load", null, { root: true });
      commit("setLoaded", true);
    },
  },
};

export default app;
