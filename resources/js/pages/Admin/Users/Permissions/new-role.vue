<template>
  <div class="max-w-lg flex flex-col space-y-2">
    <h2 class="text-lg font-bold dark:text-white">New Role</h2>

    <div class="space-y-2 flex flex-col">
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
        <Button title="Add Role" @click="save()" />
      </div>
    </div>
  </div>
</template>

<script>
import { addRole } from "@/services/permissions";

import { useToast } from "vue-toastification";

export default {
  name: "NewRole",
  data() {
    return {
      role: {
        name: "",
      },
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  methods: {
    async save() {
      let res = await addRole(this.role);

      if (res.status === 200) {
        this.toast.success(res.message);
        this.$router.push("/admin/users/roles");
      } else {
        this.toast.error(res.message);
      }
    },
  },
};
</script>
