<template>
  <form class="space-y-2">
    <Input
      placeholder="Email"
      name="email"
      v-model="this.email"
      :value="this.email"
    />
    <Input
      placeholder="Password"
      name="password"
      type="password"
      v-model="this.password"
      :value="this.password"
    />
    <Button title="SIGN IN" @click="submit" class="w-full" />
  </form>
</template>

<script>
import { useToast } from "vue-toastification";
import { auth } from "../services/auth";

export default {
  name: "LoginForm",
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
  methods: {
    async submit(e) {
      e.preventDefault();

      let res = await auth({
        email: this.email,
        password: this.password,
      });

      if (res.data.status === 200) {
        localStorage.setItem("access_token", res.data.access_token);
        await this.$store.dispatch("app/loadAppData");
        this.$router.push({ name: "Dashboard" });
      } else {
        this.toast.error(res.data.message);
      }
    },
  },
};
</script>
