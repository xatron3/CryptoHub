<template>
  <div
    class="max-w-sm w-full bg-gray-100 dark:bg-gray-700 rounded-md shadow-sm p-4"
  >
    <h2 class="text-center text-lg mb-4 uppercase font-bold dark:text-white">
      Sign In
    </h2>
    <Alert
      :content="this.error"
      class="mb-2"
      v-if="error !== null"
      type="danger"
    ></Alert>
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
      <Button title="SIGN IN" @click="submit" />
    </form>
  </div>
</template>

<script>
import Alert from "./Alert.vue";

import { useToast } from "vue-toastification";
import { auth } from "../services/auth";

export default {
  name: "LoginForm",
  components: {
    Alert,
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      email: null,
      password: null,
      error: null,
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
