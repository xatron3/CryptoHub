<template>
  <div class="max-w-md w-full bg-gray-100 rounded-md shadow-sm p-4">
    <Input placeholder="Email" name="email" />
  </div>
</template>

<script>
import Input from "./Input.vue";

export default {
  name: "LoginForm",
  components: {
    Input,
  },
};
</script>
