// Middleware
import auth from "../middleware/auth";

// Pages
import Dashboard from "@/pages/Authed/Dashboard/Dashboard.vue";
import Notes from "@/pages/Authed/Notes/notes.vue";
import ActivePositions from "@/pages/Authed/Positions/active-positions.vue";
import ClosedPositions from "@/pages/Authed/Positions/closed-positions.vue";

import ProfileSettings from "@/pages/Authed/Profile/Settings/all-settings.vue";

import Portfolio from "@/pages/Authed/Portfolio/Index.vue";

import Markets from "@/pages/Authed/Markets/overview.vue";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    beforeEnter: auth,
  },
  {
    path: "/notes",
    name: "Notes",
    component: Notes,
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
