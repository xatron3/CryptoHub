<template>
  <div>
    <div class="max-w-6xl flex flex-col space-y-2">
      <div class="flex justify-end space-x-2">
        <router-link
          to="/admin/users/roles"
          class="px-3 py-2 rounded-md bg-yellow-500"
          >Roles</router-link
        >
      </div>

      <h2 class="text-lg font-bold dark:text-white">All Users</h2>

      <Table
        :items="users"
        :columns="['email', 'is_admin', 'name', 'button']"
        buttonTitle="Edit"
        @button_clicked="edit_user"
      />
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table.vue";
import { useToast } from "vue-toastification";

import { allUsers } from "@/services/user";

export default {
  name: "Users",
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      users: {},
    };
  },
  async mounted() {
    this.users = await allUsers();
  },
  methods: {
    edit_user(data) {
      console.log(data.id);
    },
  },
  components: { Table },
};
</script>
