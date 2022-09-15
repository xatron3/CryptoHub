<template>
  <div class="flex h-full">
    <div class="items-center justify-center flex w-full -mt-28">
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
