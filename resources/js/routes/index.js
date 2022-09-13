import { createWebHistory, createRouter } from "vue-router";

// Middleware
import auth from "./middleware/auth";
import guest from "./middleware/guest";

// Public Pages
import Login from "../pages/Auth/Login/Login.vue";

// Admin Pages
import AllAssets from "../pages/Assets/All.vue";
import AddNewAsset from "../pages/Assets/New.vue";
import Dashboard from "../pages/Dashboard/Dashboard.vue";
import ActivePositions from "../pages/Positions/Active.vue";
import ClosedPositions from "../pages/Positions/Closed.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: guest,
  },
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
    path: "/positions/closed",
    name: "ClosedPositions",
    component: ClosedPositions,
    beforeEnter: auth,
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

router.beforeEach((to) => {
  document.title = `${import.meta.env.VITE_APP_NAME} - ${to.name}`;
});
