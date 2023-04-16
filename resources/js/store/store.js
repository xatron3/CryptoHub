import { createStore } from "vuex";

import assets from "./modules/assets";
import user from "./modules/user";
import positions from "./modules/positions";
import app from "./modules/app";
import web3 from "./modules/web3";
import posts from "./modules/posts";

// Create a new store instance.
const store = createStore({
  modules: {
    positions: positions,
    assets: assets,
    user: user,
    app: app,
    posts: posts,
    web3: web3,
  },
});

export default store;
