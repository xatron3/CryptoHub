<template>
  <div class="max-w-sm w-full bg-gray-100 rounded-md shadow-sm p-4">
    <h2 class="text-center text-lg mb-4 uppercase font-bold">Sign In</h2>
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

import axios from "axios";

export default {
  name: "LoginForm",
  components: {
    Alert,
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

      if (!this.email) {
        this.error = "Email is required.";
        return;
      }

      if (!this.password) {
        this.error = "Password is required.";
        return;
      }

      if (!this.validEmail(this.email)) {
        this.error = "Valid email required.";
        return;
      }

      await axios
        .post("api/login", {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          if (res.status === 200) {
            localStorage.setItem("access_token", res.data.access_token);
            this.$store.commit("setUser", res.data.user);
            this.$router.push({ name: "Dashboard" });
          } else {
            console.log(res);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validEmail: function (email) {
      var re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
  },
};
</script>
