<template>
  <div class="max-w-2xl">
    <Button title="Edit" @click="edit = !edit" />

    <div v-if="edit" class="mt-2">
      <textarea
        class="border w-full h-64 rounded-md p-2 text-black text-sm"
        id="test"
        placeholder="Description"
        v-model="notes"
      ></textarea>

      <Markdown :source="this.notes" class="markdown" />
    </div>
  </div>
</template>

<script>
import Markdown from "vue3-markdown-it";
export default {
  components: {
    Markdown,
  },
  data() {
    return {
      edit: false,
      notes: "",
    };
  },
};
</script>
