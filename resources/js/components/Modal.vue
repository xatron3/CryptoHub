<template>
  <vue-final-modal
    v-slot="{ params }"
    v-bind="$attrs"
    classes="modal-container"
    content-class="modal-content"
    v-on="listeners"
    class=""
  >
    <div
      class="modal__title uppercase text-center dark:text-gray-100 font-medium"
    >
      <slot name="title"></slot>
    </div>
    <div class="modal__content">
      <slot v-bind:params="params"></slot>
    </div>
    <button class="vfm__close" @click="$emit('hideModal')">X</button>
  </vue-final-modal>
</template>

<script>
export default {
  name: "Modal",
  inheritAttrs: false,
};
</script>
