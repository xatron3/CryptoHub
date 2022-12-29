<template>
  <Modal v-model="show" @closed="$emit('hideModal')" class="loginModal">
    <template v-slot:title>SIGN IN</template>
    <div class="space-y-2 py-3">
      <LoginForm />
    </div>
  </Modal>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  props: ["show"],
  components: {
    LoginForm,
  },
};
</script>

<style>
.loginModal .vfm__container .vfm__content {
  max-width: 450px !important;
  padding: 12px 20px 12px 20px;
}
</style>
