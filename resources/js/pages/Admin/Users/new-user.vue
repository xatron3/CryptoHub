<template>
  <div class="space-y-2 max-w-lg flex flex-col">
    <h2 class="text-lg font-bold dark:text-white">New User</h2>

    <Input
      :showLabel="true"
      name="name"
      autocomplete="true"
      type="text"
      placeholder="Name"
      :value="this.user.name"
      v-model="this.user.name"
    />

    <Input
      :showLabel="true"
      name="email"
      autocomplete="true"
      type="email"
      placeholder="Email"
      :value="this.user.email"
      v-model="this.user.email"
    />

    <Input
      :showLabel="true"
      name="password"
      autocomplete="off"
      type="password"
      placeholder="Password"
      :value="this.user.password"
      v-model="this.user.password"
    />

    <Input
      :showLabel="true"
      name="password_confirmation"
      autocomplete="off"
      type="password"
      placeholder="Conf. Password"
      :value="this.user.password_confirmation"
      v-model="this.user.password_confirmation"
    />

    <div class="self-end">
      <Button title="Update User" @click="register()" />
    </div>
  </div>
</template>

<script>
import EditUserForm from "@/components/EditUserForm.vue";
import Table from "@/components/Table.vue";
import { useToast } from "vue-toastification";
import { register } from "@/services/user";

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
        password: "",
        password_confirmation: "",
      },
    };
  },
  async mounted() {},
  methods: {
    async register() {
      let res = await register(this.user);
    },
  },
};
</script>
