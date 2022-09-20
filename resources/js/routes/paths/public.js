// Middlewares
import guest from "../middleware/guest";

// Pages
import Login from "@/pages/Login/Login.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
    beforeEnter: guest,
  },
];

export default routes;
