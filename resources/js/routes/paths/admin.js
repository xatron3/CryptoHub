// Middleware
import admin from "../middleware/admin";

// Pages
import AllAssets from "@/pages/Admin/Assets/All.vue";
import AddNewAsset from "@/pages/Admin/Assets/New.vue";
import AllEvents from "@/pages/Admin/Events/All.vue";

const routes = [
  {
    path: "/admin/assets",
    name: "Assets",
    component: AllAssets,
    beforeEnter: admin,
  },
  {
    path: "/admin/assets/new",
    name: "Add New Asset",
    component: AddNewAsset,
    beforeEnter: admin,
  },
  {
    path: "/admin/events",
    name: "Events",
    component: AllEvents,
    beforeEnter: admin,
  },
];

export default routes;
