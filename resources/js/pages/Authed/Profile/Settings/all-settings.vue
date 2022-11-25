<template>
  <div class="max-w-lg">
    <h2 class="text-lg font-bold dark:text-white">User Settings</h2>

    <div class="space-y-2 flex flex-col">
      <Input
        :showLabel="true"
        name="name"
        autocomplete="off"
        type="text"
        placeholder="Name"
        :value="this.userData.name"
        v-model="this.userData.name"
      />

      <Input
        :showLabel="true"
        name="email"
        autocomplete="off"
        type="text"
        disabled
        placeholder="Email"
        :value="this.userData.email"
        v-model="this.userData.email"
      />

      <div class="self-end">
        <Button title="Update User" @click="updateUserData()" />
      </div>
    </div>
  </div>
</template>
<script>
import { updateUser } from "@/services/user";

export default {
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
