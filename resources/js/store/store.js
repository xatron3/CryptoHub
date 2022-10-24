import { createStore } from "vuex";
import { getUser } from "../services/auth";
import { router } from "../routes/index";

import assets from "./modules/assets";
import user from "./modules/user";
import app from "./modules/app";

// Create a new store instance.
const store = createStore({
  modules: {
    assets: assets,
    user: user,
    app: app,
  },
});

export default store;
