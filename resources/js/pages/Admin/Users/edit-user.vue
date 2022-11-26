<template>
  <div>
    <div class="max-w-lg flex flex-col space-y-2" v-if="this.userLoaded">
      <div class="flex justify-end space-x-2"></div>

      <h2 class="text-lg font-bold dark:text-white">User</h2>
      <EditUserForm :userData="user" @update="update" />

      <h2 class="text-lg font-bold dark:text-white">User Roles</h2>
      {{ roles }}
    </div>
  </div>
</template>

<script>
import EditUserForm from "@/components/EditUserForm.vue";
import Table from "@/components/Table.vue";
import { useToast } from "vue-toastification";
import { getUser } from "@/services/user";
import { getRoles } from "@/services/permissions";

export default {
  name: "EditUser",
  components: { Table, EditUserForm },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      userLoaded: false,
      user: {
        name: "",
        email: "",
      },
      roles: {},
    };
  },
  async mounted() {
    this.user = await getUser({ id: this.$route.params.id });
    this.roles = await getRoles();
    this.userLoaded = true;
  },
  methods: {
    update(data) {
      console.log(data);
    },
  },
};
</script>
