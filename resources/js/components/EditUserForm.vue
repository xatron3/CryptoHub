<template>
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

    <div class="self-end">
      <Button title="Update User" @click="updateUserData()" />
    </div>
  </div>
</template>

<script>
export default {
  props: ["userData"],
  name: "EditUserForm",
  components: {},
  data() {
    return {
      user: {},
    };
  },
  mounted() {
    this.user = this.userData;
  },
  methods: {
    updateUserData() {
      this.$emit("update", this.user);
    },
  },
};
</script>
