<template>
  <div class="items-center justify-center flex w-full">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../../../components/LoginForm.vue";

export default {
  name: "Login",
  components: { LoginForm },
};
</script>
