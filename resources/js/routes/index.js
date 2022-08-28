import { createWebHistory, createRouter } from "vue-router";

// Middleware
import auth from "./middleware/auth";
import guest from "./middleware/guest";

// Public Pages
import Login from "../pages/Auth/Login/Login.vue";
import Dashboard from "../pages/Dashboard/Dashboard.vue";
import ActivePositions from "../pages/Positions/Active.vue";

// Admin Pages
import AllAssets from "../pages/Assets/All.vue";
import AddNewAsset from "../pages/Assets/New.vue";

const routes = [
  {
    path: "/dashboard",
    name: "Home",
    component: Dashboard,
    beforeEnter: auth,
  },
  {
    path: "/positions/active",
    name: "ActivePositions",
    component: ActivePositions,
    beforeEnter: auth,
  },
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: guest,
  },
  {
    path: "/admin/assets",
    name: "Assets",
    component: AllAssets,
    beforeEnter: auth,
  },
  {
    path: "/admin/assets/new",
    name: "AddNewAsset",
    component: AddNewAsset,
    beforeEnter: auth,
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
