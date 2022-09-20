// Middleware
import auth from "../middleware/auth";

// Pages
import Dashboard from "@/pages/Dashboard/Dashboard.vue";
import ActivePositions from "@/pages/Positions/Active.vue";
import ClosedPositions from "@/pages/Positions/Closed.vue";

import ProfileSettings from "@/pages/Profile/Settings/Index.vue";

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
];

export default routes;
