<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-700">
    <div
      class="sidebar min-h-screen overflow-hidden border-r shadow-sm dark:border-gray-600"
      :class="showMobileNavigation"
    >
      <div class="flex h-screen flex-col justify-between pt-2 pb-6">
        <div>
          <div class="w-max p-4 mb-3 dark:text-gray-200">{{ logo }}</div>
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

            <NavigationHeader title="Portfolio" />
            <NavigationLink
              path="/portfolio"
              title="View Portfolio"
              icon="BriefcaseIconOutlined"
            ></NavigationLink>

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

            <AdminLinks />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationLink from "./components/NavigationLink.vue";
import NavigationHeader from "./components/NavigationHeader.vue";
import AdminLinks from "./components/AdminLinks.vue";

export default {
  name: "Navigation",
  data() {
    return {
      title: "Navigation",
    };
  },
  mounted() {},
  computed: {
    logo() {
      return import.meta.env.VITE_APP_NAME;
    },
    showMobileNavigation() {
      if (this.$store.state.settings.showNavigation) {
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
