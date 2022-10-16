import { createStore } from "vuex";
import { getUser } from "../services/auth";
import { router } from "../routes/index";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      settings: {
        showNavigation: true,
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
    toggleNavigation(state) {
      state.settings.showNavigation = !state.settings.showNavigation;
    },
  },
  actions: {
    getUser(context, data) {
      return new Promise(async (resolve, reject) => {
        if (localStorage.getItem("access_token")) {
          if (context.state.user === null) {
            let res = await getUser();

            if (res !== undefined) {
              context.commit("setUser", res.data);
              resolve(res.data);
            } else {
              localStorage.removeItem("access_token");
              reject("No user found");
            }
          } else {
            resolve(context.state.user);
          }
        } else {
          reject("No access token found");
        }
      });
    },
  },
});

export default store;
