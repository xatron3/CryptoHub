<template>
  <div v-if="this.$store.getters.isAdmin === 1">
    <NavigationHeader title="ADMINPANEL" />
    <NavigationLink path="/admin/assets/" title="Assets"></NavigationLink>
    <NavigationLink path="/admin/events/" title="Events"></NavigationLink>
  </div>
</template>

<script>
import NavigationLink from "./NavigationLink.vue";
import NavigationHeader from "./NavigationHeader.vue";

export default {
  name: "AdminLinks",
  components: {
    NavigationLink,
    NavigationHeader,
  },
};
</script>
