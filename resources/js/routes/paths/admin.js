// Middleware
import admin from "../middleware/admin";

// Pages
import Events from "@/pages/Admin/Events/all-events.vue";

// Assets
import Assets from "@/pages/Admin/Assets/all-assets.vue";
import EditAsset from "@/pages/Admin/Assets/edit-asset.vue";
import NewAsset from "@/pages/Admin/Assets/new-asset.vue";

const routes = [
  {
    path: "/admin/assets",
    name: "Assets",
    component: Assets,
    beforeEnter: admin,
  },
  {
    path: "/admin/assets/new",
    name: "Add New Asset",
    component: NewAsset,
    beforeEnter: admin,
  },
  {
    path: "/admin/asset/edit/:id",
    name: "Edit Asset",
    component: EditAsset,
    beforeEnter: admin,
  },
  {
    path: "/admin/events",
    name: "Events",
    component: Events,
    beforeEnter: admin,
  },
];

export default routes;
