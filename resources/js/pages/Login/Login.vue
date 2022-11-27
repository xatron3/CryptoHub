<template>
  <div class="flex flex-col">
    <Navbar />

    <div class="self-center w-full max-w-sm mt-56">
      <LoginForm />
    </div>
  </div>
</template>

<script>
import Navbar from "@/pages/Public/components/Navbar/navbar.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login",
  components: { LoginForm, Navbar },
};
</script>
