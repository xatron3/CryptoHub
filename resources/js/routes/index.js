import { createWebHistory, createRouter } from "vue-router";

// Middleware
import auth from "./middleware/auth";

// Public Pages
import Home from "../pages/Home/Home.vue";
import Test from "../pages/Test.vue";
import Login from "../pages/Auth/Login/Login.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },

  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: auth,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
