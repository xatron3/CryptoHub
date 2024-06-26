<template>
  <div>
    <h2 class="text-lg font-bold dark:text-white">User</h2>
    <div class="max-w-lg flex flex-col space-y-2" v-if="this.userLoaded">
      <div class="space-y-2 flex flex-col">
        <Input
          :showLabel="true"
          name="name"
          autocomplete="off"
          type="text"
          placeholder="Name"
          :value="this.user.name"
          v-model="this.user.name"
        />

        <Input
          :showLabel="true"
          name="email"
          autocomplete="off"
          type="text"
          disabled
          placeholder="Email"
          :value="this.user.email"
          v-model="this.user.email"
        />
      </div>

      <h2 class="text-lg font-bold dark:text-white">User Roles</h2>

      <div class="flex space-x-2">
        <div
          class="rounded-md bg-blue-500 p-2 uppercase cursor-pointer"
          v-for="role in roles.data"
          :class="{
            'bg-blue-700 cursor-default': user.role === role.name,
          }"
          :key="role.id"
          @click="user.role = role.name"
        >
          <span>{{ role.name }}</span>
        </div>
      </div>

      <div class="self-end">
        <Button title="Update User" @click="updateUserData()" />
      </div>

      <h2 class="text-lg font-bold dark:text-white">User Info</h2>
      <div>Total active positions: {{ activePositionAmount.length }}</div>
      <div>Total closed positions: {{ closedPositionAmount.length }}</div>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { getUser, updateUser } from "@/services/user";
import { getRoles } from "@/services/permissions";

export default {
  name: "EditUser",
  components: {},
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  computed: {
    activePositionAmount() {
      return this.user.positions.filter((item) => {
        return item.close_amount === null;
      });
    },
    closedPositionAmount() {
      return this.user.positions.filter((item) => {
        return item.close_amount !== null;
      });
    },
  },
  data() {
    return {
      userLoaded: false,
      user: {},
      roles: {},
    };
  },
  async mounted() {
    this.user = await getUser({ id: this.$route.params.id });
    this.user.user_id = this.$route.params.id;

    this.roles = await getRoles();
    this.userLoaded = true;
  },
  methods: {
    async updateUserData() {
      const res = await updateUser(this.user);

      this.toast.success("User updated");
      this.$router.push("/admin/users");
    },
  },
};
</script>
