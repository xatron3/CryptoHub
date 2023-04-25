<template>
  <div class="space-y-2">
    <HeaderText>Admin Commands</HeaderText>

    <div>
      <UpdateCoingecko />
    </div>
  </div>
</template>

<script>
import UpdateCoingecko from "./commands/update-coingecko.vue";

export default {
  name: "Commands",
  components: {
    UpdateCoingecko,
  },
  mounted() {},
};
</script>
