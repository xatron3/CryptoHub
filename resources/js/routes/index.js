import { createWebHistory, createRouter } from "vue-router";

// Routes
import PublicRoutes from "./paths/public";
import AuthedRoutes from "./paths/authed";
import AdminRoutes from "./paths/admin";

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
