<template>
  <div class="max-w-6xl flex flex-col space-y-2">
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
};
</script>
