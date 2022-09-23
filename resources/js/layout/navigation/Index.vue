<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-700">
    <div
      class="sidebar min-h-screen overflow-hidden border-r w-56 shadow-sm dark:border-gray-600"
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
            <div v-if="this.$store.state.user.is_admin === 1">
              <NavigationHeader title="ADMINPANEL" />
              <NavigationLink
                path="/admin/assets/"
                title="Assets"
              ></NavigationLink>
              <NavigationLink
                path="/admin/events/"
                title="Events"
              ></NavigationLink>
            </div>
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
};
</script>
