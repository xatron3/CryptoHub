import { createStore } from "vuex";

import assets from "./modules/assets";
import user from "./modules/user";
import app from "./modules/app";
import web3 from "./modules/web3";

// Create a new store instance.
const store = createStore({
  modules: {
    assets: assets,
    user: user,
    app: app,
    web3: web3,
  },
});

export default store;
