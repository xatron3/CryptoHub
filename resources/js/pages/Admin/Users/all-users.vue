<template>
  <div class="max-w-6xl flex flex-col space-y-2">
    <h2 class="text-lg font-bold dark:text-white">All Users</h2>

    <div class="flex justify-end space-x-2">
      <router-link
        to="/admin/users/new"
        class="px-3 py-2 rounded-md bg-green-500"
        >New User</router-link
      >
      <router-link
        to="/admin/users/roles"
        class="px-3 py-2 rounded-md bg-yellow-500"
        >Roles</router-link
      >
    </div>

    <Table
      :items="users"
      :columns="['email', 'name', 'button']"
      buttonTitle="Edit"
      @button_clicked="edit_user"
    />
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
      this.$router.push(`/admin/users/${data.id}`);
    },
  },
  components: { Table },
};
</script>
