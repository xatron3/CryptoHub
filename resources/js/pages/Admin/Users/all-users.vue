<template>
  <div class="max-w-6xl flex flex-col space-y-2">
    <div class="flex">
      <HeaderText>All Users</HeaderText>
      <div class="flex space-x-2 ml-auto">
        <Button
          title="NEW USER"
          @click="this.$router.push('/admin/users/new')"
        ></Button>

        <Button
          title="ROLES"
          class="bg-yellow-500 hover:bg-yellow-600"
          @click="this.$router.push('/admin/users/roles')"
        ></Button>
      </div>
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
            "<div class='bg-green-500 text-white hover:bg-green-600 transition-all px-3 py-2 rounded-md inline-flex cursor-pointer'>Edit</div>",
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
