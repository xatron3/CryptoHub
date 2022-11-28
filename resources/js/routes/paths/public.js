// Middlewares
import guest from "../middleware/guest";
import publicPage from "../middleware/publicPage";

// Auth Pages
import Login from "@/pages/Login/Login.vue";

// Public Pages
import Home from "@/pages/Public/Home/home.vue";
import Swap from "@/pages/Public/Swap/swap.vue";

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
    beforeEnter: publicPage,
  },
  {
    path: "/swap",
    name: "Swap",
    component: Swap,
    beforeEnter: publicPage,
  },
];

export default routes;
