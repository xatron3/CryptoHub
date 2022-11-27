<template>
  <div class="overflow-auto">
    <table class="min-w-max w-full table-auto" v-if="this.items">
      <Head :headers="this.headers" />

      <Body
        :items="this.items"
        :headers="this.headers"
        @btn_clicked="btn_clicked"
      />
    </table>
  </div>

  <!-- METADATA -->
  <div
    class="mt-3 mx-auto rounded-md overflow-hidden flex justify-center"
    v-if="this.meta"
  >
    <div
      v-for="meta in this.meta.links"
      v-bind:key="meta.label"
      class="px-2 py-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-900 transition-all"
      :class="{
        'bg-gray-200 dark:bg-gray-600': meta.active,
        'bg-gray-100 dark:bg-gray-700': !meta.active,
      }"
      v-on:click="$emit('change_page', getPaginationPage(meta.label))"
    >
      <span v-html="meta.label"></span>
    </div>
  </div>
</template>

<script>
// Table Components
import Head from "./Head.vue";
import Body from "./Body.vue";

import LaravelVuePagination from "laravel-vue-pagination";

export default {
  components: {
    LaravelVuePagination,
    Head,
    Body,
  },
  props: ["headers", "items", "meta"],
  emits: ["button_clicked", "change_page"],
  name: "Table",
  methods: {
    getPaginationPage(label) {
      return xa.getPaginationPage(label);
    },
    btn_clicked(item) {
      this.$emit("button_clicked", item);
    },
  },
};
</script>
