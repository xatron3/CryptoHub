<template>
  <div class="max-w-6xl flex flex-col space-y-2">
    <HeaderText>All Users</HeaderText>

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
      :items="this.users"
      :headers="this.headers"
      buttonTitle="Edit"
      @button_clicked="edit_user"
    />
  </div>
</template>

<script>
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
      headers: [
        {
          title: "Email",
          value: "email",
        },
        {
          title: "Name",
          value: "name",
        },
        {
          title: "Role",
          value: "role",
        },
        {
          title: "Edit",
          value:
            "<a href='#' class='bg-green-500 text-white hover:bg-green-600 transition-all px-3 py-2 rounded-md'>Edit</a>",
          customValue: true,
        },
      ],
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
  components: {},
};
</script>
