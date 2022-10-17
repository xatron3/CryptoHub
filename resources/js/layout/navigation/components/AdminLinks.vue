<template>
  <div v-if="this.$store.getters.isAdmin === 1">
    <NavigationHeader class="text-lg border-b-0" title="ADMINPANEL" />
    <NavigationHeader class="mt-0.5" title="General" />
    <NavigationLink path="/admin/commands/" title="Commands"></NavigationLink>

    <NavigationHeader title="Assets" />
    <NavigationLink path="/admin/assets/" title="All Assets"></NavigationLink>
    <NavigationLink path="/admin/assets/new" title="New Asset"></NavigationLink>

    <NavigationHeader title="Events" />
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
