<template>
  <div class="flex flex-col">
    <div class="self-center w-full max-w-sm mt-56">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login",
  components: { LoginForm },
};
</script>
