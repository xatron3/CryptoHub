<template>
  <div>
    <div class="max-w-6xl flex flex-col space-y-2">
      <h2 class="text-lg font-bold dark:text-white">All Roles</h2>

      <div class="flex justify-end space-x-2">
        <Button
          @click="$router.push('/admin/users/roles/new')"
          title="Add New"
          class="w-28 self-end"
        />
      </div>

      <Table
        :items="roles.data"
        :headers="this.headers"
        @button_clicked="editRole"
      />
    </div>
  </div>
</template>

<script>
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
      headers: [
        {
          title: "Name",
          value: "name",
        },
        {
          title: "Edit",
          value:
            "<a href='#' class='bg-green-500 text-white hover:bg-green-600 transition-all px-3 py-2 rounded-md'>Edit</a>", // TODO: Hook too func or smth
          customValue: true,
        },
      ],
      roles: {},
    };
  },
  async mounted() {
    this.roles = await getRoles();
  },
  methods: {
    editRole(data) {
      this.$router.push(`/admin/users/roles/edit/${data.id}`);
    },
  },
  components: {},
};
</script>
