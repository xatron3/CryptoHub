// Middleware
import admin from "../middleware/admin";

// Pages
import Events from "@/pages/Admin/Events/all-events.vue";

// Users
import Users from "@/pages/Admin/Users/all-users.vue";
import NewUser from "@/pages/Admin/Users/new-user.vue";
import EditUser from "@/pages/Admin/Users/edit-user.vue";

// Roles
import Roles from "@/pages/Admin/Users/Permissions/all-roles.vue";
import EditRole from "@/pages/Admin/Users/Permissions/edit-role.vue";
import NewRole from "@/pages/Admin/Users/Permissions/new-role.vue";

// Assets
import Assets from "@/pages/Admin/Assets/all-assets.vue";
import EditAsset from "@/pages/Admin/Assets/edit-asset.vue";
import NewAsset from "@/pages/Admin/Assets/new-asset.vue";

// Posts
import Posts from "@/pages/Admin/Posts/all-posts.vue";
import ViewPost from "@/pages/Admin/Posts/view-post.vue";

// Commands
import Commands from "@/pages/Admin/Commands/all-commands.vue";

// Chains
import AllChains from "@/pages/Admin/Chains/all-chains.vue";

const routes = [
  {
    path: "/admin/posts",
    name: "Posts",
    component: Posts,
    beforeEnter: admin,
  },
  {
    path: "/admin/posts/new",
    name: "New Posts",
    component: ViewPost,
    beforeEnter: admin,
  },
  {
    path: "/admin/post/edit/:id",
    name: "Edit Post",
    component: ViewPost,
    beforeEnter: admin,
  },
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
  {
    path: "/admin/commands",
    name: "Commands",
    component: Commands,
    beforeEnter: admin,
  },
  {
    path: "/admin/chains",
    name: "Chains",
    component: AllChains,
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
    component: Users,
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
    component: Roles,
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
