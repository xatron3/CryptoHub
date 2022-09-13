<template>
  <div class="min-h-screen bg-gray-100">
    <div class="sidebar min-h-screen overflow-hidden border-r w-56 shadow-sm">
      <div class="flex h-screen flex-col justify-between pt-2 pb-6">
        <div>
          <div class="w-max p-4 mb-3">{{ logo }}</div>
          <div class="mx-4">
            <NavigationHeader title="General" />
            <NavigationLink
              path="/dashboard"
              title="Dashboard"
              icon="Squares2X2Icon"
            ></NavigationLink>
            <NavigationHeader title="TRADES" />
            <NavigationLink
              path="/positions/active"
              title="Active Positions"
              icon="BriefcaseIcon"
            ></NavigationLink>
            <NavigationLink
              path="/positions/closed"
              title="Closed Positions"
              icon="BriefcaseIcon"
            ></NavigationLink>
            <NavigationHeader title="ADMINPANEL" />
            <NavigationLink
              path="/admin/assets/"
              title="All Assets"
            ></NavigationLink>
          </div>
        </div>
        <div class="w-full -mb-3 mx-4 flex">
          <div
            @click="logout()"
            class="group flex items-center space-x-4 rounded-md text-sm py-1.5 text-gray-600 w-full cursor-pointer"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationLink from "./components/NavigationLink.vue";
import NavigationHeader from "./components/NavigationHeader.vue";

export default {
  name: "Navigation",
  data() {
    return {
      title: "Navigation",
    };
  },
  computed: {
    logo() {
      return import.meta.env.VITE_APP_NAME;
    },
  },
  components: {
    NavigationLink,
    NavigationHeader,
  },
  methods: {
    logout() {
      cookie.removeItem("access_token");
      this.$store.commit("setUser", null);
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
