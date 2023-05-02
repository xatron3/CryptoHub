// Middlewares
import publicPage from "../middleware/publicPage";

import NotFound from "@/pages/Public/NotFound/not-found.vue";

// Public Pages
import Home from "@/pages/Public/Home/home.vue";
import Swap from "@/pages/Public/Swap/swap.vue";
import SinglePost from "@/pages/Public/Blog/single-post.vue";
import CyclopToken from "@/pages/Public/CyclopToken/token.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: publicPage,
  },
  {
    path: "/cyclop-token",
    name: "CyclopToken",
    component: CyclopToken,
    beforeEnter: publicPage,
  },
  {
    path: "/swap",
    name: "Swap",
    component: Swap,
    beforeEnter: publicPage,
  },
  {
    path: "/article/:title",
    name: "Article",
    component: SinglePost,
    beforeEnter: publicPage,
  },
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

export default routes;
