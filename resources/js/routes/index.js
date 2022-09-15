import { createWebHistory, createRouter } from "vue-router";

// Routes
import PublicRoutes from "./public";
import AuthedRoutes from "./authed";
import AdminRoutes from "./admin";

var allRoutes = [];
allRoutes = allRoutes.concat(PublicRoutes, AuthedRoutes, AdminRoutes);
const routes = allRoutes;

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to) => {
  document.title = `${import.meta.env.VITE_APP_NAME} - ${to.name}`;
});
