<template>
  <div class="rounded-md flex flex-col overflow-hidden">
    <div
      @click="open = !open"
      class="flex text-sm font-semibold uppercase py-2 cursor-pointer bg-gray-200 px-2"
    >
      <div><slot name="header"></slot></div>
      <div class="ml-auto mr-1 flex items-center">
        <ChevronDownIcon class="w-3.5" v-if="!open" />
        <ChevronUpIcon class="w-3.5" v-if="open" />
      </div>
    </div>
    <div v-if="open" class="p-1 bg-gray-100">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/solid";

export default {
  name: "Accordion",
  components: {
    ChevronDownIcon,
    ChevronUpIcon,
  },
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
};
</script>
