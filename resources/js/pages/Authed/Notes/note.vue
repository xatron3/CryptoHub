<template>
  <div v-if="this.note !== null" class="max-w-6xl flex flex-col space-y-2">
    <!-- Header -->
    <div class="flex items-center">
      <router-link :to="`/notes`"><ChevronLeftIcon class="h-6" /></router-link>
      <header-text>{{ this.note.title }}</header-text>

      <div class="ml-auto space-x-2">
        <Button
          title="Edit"
          class="bg-green-500 hover:bg-green-600"
          @click="edit = !edit"
        />
        <Button
          title="Remove"
          class="bg-red-500 hover:bg-red-600"
          @click="deleteNote"
        />
      </div>
    </div>

    <!-- Content -->
    <textarea
      class="h-96 bg-gray-800 order-transparent focus:border-transparent focus:ring-0"
      v-if="edit"
      v-model="note.content"
    >
      {{ note.content }}
    </textarea>

    <div v-html="note.content" v-if="!edit"></div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { deleteNote } from "@/services/notes";
import { useToast } from "vue-toastification";

export default {
  name: "Note",
  components: {
    ChevronLeftIcon,
  },
  data() {
    return {
      id: null,
      note: null,
      edit: false,
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  mounted() {
    this.id = this.$route.params.id;
    this.note = this.$store.getters["user/note"](this.id);
  },
  methods: {
    async deleteNote() {
      const result = await deleteNote({ id: this.id });

      if (result.status === 200) {
        this.toast.success(result.message);
        await this.$store.dispatch("user/getUser");
        this.$router.push("/notes");
      } else {
        this.toast.error(result.message);
      }
    },
  },
};
</script>
