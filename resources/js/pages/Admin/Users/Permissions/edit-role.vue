<template>
  <div class="max-w-lg flex flex-col space-y-2">
    <h2 class="text-lg font-bold dark:text-white">Edit Role</h2>

    <div v-if="this.loaded" class="flex flex-col space-y-2">
      <Input
        :showLabel="true"
        name="name"
        autocomplete="off"
        type="text"
        placeholder="Name"
        :value="this.role.name"
        v-model="this.role.name"
      />

      <div class="self-end">
        <Button title="Update Role" @click="update()" />
      </div>
    </div>
  </div>
</template>

<script>
import { getRoles, updateRole } from "@/services/permissions";

import { useToast } from "vue-toastification";

export default {
  name: "NewRole",
  data() {
    return {
      loaded: false,
      role: {
        id: null,
        name: "",
      },
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  async mounted() {
    this.role = await this.getRole();
    this.loaded = true;
  },
  methods: {
    async getRole() {
      let role = await getRoles({ id: this.$route.params.id });

      return role.data[0];
    },
    async update() {
      let res = await updateRole(this.role);

      if (res.status === 200) {
        this.toast.success(res.message);
      } else {
        this.toast.error(res.message);
      }
    },
  },
};
</script>
