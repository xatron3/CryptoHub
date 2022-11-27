// Middleware
import admin from "../middleware/admin";

// Pages
import AllEvents from "@/pages/Admin/Events/all-events.vue";

// Users
import AllUsers from "@/pages/Admin/Users/all-users.vue";
import NewUser from "@/pages/Admin/Users/new-user.vue";
import EditUser from "@/pages/Admin/Users/edit-user.vue";

import AllRoles from "@/pages/Admin/Users/Permissions/all-roles.vue";
import EditRole from "@/pages/Admin/Users/Permissions/edit-role.vue";
import NewRole from "@/pages/Admin/Users/Permissions/new-role.vue";

// Assets
import Assets from "@/pages/Admin/Assets/all-assets.vue";
import EditAsset from "@/pages/Admin/Assets/edit-asset.vue";
import NewAsset from "@/pages/Admin/Assets/new-asset.vue";

// Commands
import Commands from "@/pages/Admin/Commands/all-commands.vue";

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
    component: AllEvents,
    beforeEnter: admin,
  },
  {
    path: "/admin/commands",
    name: "Commands",
    component: Commands,
    beforeEnter: admin,
  },
  {
    path: "/admin/users/:id",
    name: "Edit Users",
    component: EditUser,
    beforeEnter: admin,
  },
  {
    path: "/admin/users",
    name: "Users",
    component: AllUsers,
    beforeEnter: admin,
  },
  {
    path: "/admin/users/new",
    name: "New User",
    component: NewUser,
    beforeEnter: admin,
  },
  {
    path: "/admin/users/roles",
    name: "User Roles",
    component: AllRoles,
    beforeEnter: admin,
  },
  {
    path: "/admin/users/roles/new",
    name: "New User Role",
    component: NewRole,
    beforeEnter: admin,
  },
  {
    path: "/admin/users/roles/edit/:id",
    name: "Edit Role",
    component: EditRole,
    beforeEnter: admin,
  },
];

export default routes;
