<template>
  <div class="max-w-lg">
    <h2 class="text-lg font-bold dark:text-white">User Settings</h2>

    <EditUser :userData="this.userData" @update="updateUserData" />
  </div>
</template>
<script>
import EditUser from "@/components/EditUserForm.vue";
import { updateUser } from "@/services/user";

export default {
  components: {
    EditUser,
  },
  data() {
    return {
      userData: {
        name: "",
        email: "",
      },
    };
  },
  mounted() {
    const userData = this.$store.getters["user/userData"];

    this.userData.name = userData.name;
    this.userData.email = userData.email;
  },
  methods: {
    async updateUserData() {
      const res = await updateUser(this.userData);
    },
  },
};
</script>
