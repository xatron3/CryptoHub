<template>
  <nav class="min-h-screen bg-gray-100 dark:bg-gray-700">
    <div
      class="sidebar min-h-screen overflow-hidden border-r shadow-sm dark:border-gray-600"
      :class="showMobileNavigation"
    >
      <div class="flex h-screen flex-col justify-between pt-2 pb-6">
        <div>
          <div class="w-max p-4 mb-3 dark:text-gray-200">
            <router-link to="/dashboard" class="flex items-center">
              <img :src="this.logo" class="w-8" />
              <span class="ml-2">{{ logo }}</span>
            </router-link>
          </div>
          <div class="mx-4">
            <NavigationHeader title="General" />
            <NavigationLink
              path="/dashboard"
              title="Dashboard"
              icon="Squares2X2Icon"
            ></NavigationLink>
            <NavigationLink
              path="/markets"
              title="Market Overview"
              icon="ComputerDesktopIcon"
            ></NavigationLink>

            <NavigationLink
              path="/notes"
              title="Notes"
              icon="PencilSquareIcon"
            ></NavigationLink>

            <NavigationHeader title="Portfolio" />
            <NavigationLink
              path="/portfolio"
              title="View Portfolio"
              icon="BriefcaseIconOutlined"
            ></NavigationLink>

            <div v-if="this.$store.getters['user/role'] >= 10">
              <NavigationHeader title="TRADES" />
              <NavigationLink
                path="/positions/active"
                title="Active Positions"
                icon="BriefcaseIconOutlined"
              ></NavigationLink>
              <NavigationLink
                path="/positions/closed"
                title="Closed Positions"
                icon="BriefcaseIcon"
              ></NavigationLink>
            </div>
            <AdminLinks />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import NavigationLink from "./components/NavigationLink.vue";
import NavigationHeader from "./components/NavigationHeader.vue";
import AdminLinks from "./components/AdminLinks.vue";
import Logo from "../../../../images/logo.png";

export default {
  name: "Navigation",
  data() {
    return {
      title: "Navigation",
      logo: "",
    };
  },
  mounted() {
    this.logo = Logo;
  },
  computed: {
    logo() {
      return import.meta.env.VITE_APP_NAME;
    },
    showMobileNavigation() {
      if (this.$store.state.app.settings.showNavigation) {
        return "w-56";
      } else {
        return "w-0";
      }
    },
  },
  components: {
    NavigationLink,
    NavigationHeader,
    AdminLinks,
  },
};
</script>
