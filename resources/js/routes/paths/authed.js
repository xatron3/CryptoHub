// Middleware
import auth from "../middleware/auth";

// Pages
import Dashboard from "@/pages/Authed/Dashboard/Dashboard.vue";
import ActivePositions from "@/pages/Authed/Positions/Active.vue";
import ClosedPositions from "@/pages/Authed/Positions/Closed.vue";

import ProfileSettings from "@/pages/Authed/Profile/Settings/Index.vue";

import Portfolio from "@/pages/Authed/Portfolio/Index.vue";

import Markets from "@/pages/Authed/Markets/Index.vue";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: auth,
  },
  {
    path: "/profile/settings",
    name: "Profile Settings",
    component: ProfileSettings,
    beforeEnter: auth,
  },
  {
    path: "/positions/active",
    name: "Active Positions",
    component: ActivePositions,
    beforeEnter: auth,
  },
  {
    path: "/positions/closed",
    name: "Closed Positions",
    component: ClosedPositions,
    beforeEnter: auth,
  },
  {
    path: "/portfolio",
    name: "Portfolio",
    component: Portfolio,
    beforeEnter: auth,
  },
  {
    path: "/markets",
    name: "Market Screener",
    component: Markets,
    beforeEnter: auth,
  },
];

export default routes;
