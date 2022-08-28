<template>
  <div class="items-center justify-center flex w-full -mt-28">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../../../components/LoginForm.vue";
import { useCookies } from "vue3-cookies";

export default {
  name: "Login",
  components: { LoginForm },
  setup() {
    const { cookies } = useCookies();
    return { cookies };
  },
  async mounted() {
    if (this.cookies.get("access_token")) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
