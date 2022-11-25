<template>
  <div>
    <div class="max-w-6xl flex flex-col space-y-2">
      <div class="flex justify-end space-x-2"></div>

      <h2 class="text-lg font-bold dark:text-white">All Roles</h2>

      <Table :items="roles" :columns="['name']" />
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import { useToast } from "vue-toastification";

import { getRoles } from "@/services/permissions";

export default {
  name: "Roles",
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      roles: {},
    };
  },
  async mounted() {
    this.roles = await getRoles();
  },
  methods: {},
  components: { Table },
};
</script>
