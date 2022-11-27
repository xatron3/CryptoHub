// Middlewares
import guest from "../middleware/guest";

// Auth Pages
import Login from "@/pages/Login/Login.vue";

// Public Pages
import Home from "@/pages/Public/Home/home.vue";

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    beforeEnter: guest,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
];

export default routes;
