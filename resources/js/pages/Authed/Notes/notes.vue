<template>
  <div class="max-w-6xl space-y-2">
    <div class="flex">
      <HeaderText>NOTES</HeaderText>
      <Button
        title="Add New"
        class="ml-auto"
        @click="this.showNewNoteModal = true"
      />
    </div>

    <div class="grid grid-cols-3 gap-2">
      <router-link
        v-for="note in this.$store.getters['user/notes']"
        class="dark:bg-gray-700 bg-gray-200 px-3 py-3 shadow-lg rounded-md space-y-1 cursor-pointer hover:shadow-xl hover:transition hover:duration-300 hover:ease-out dark:hover:text-gray-100 dark:hover:bg-gray-600 hover:bg-gray-100 hover:text-gray-700"
        :to="`/note/${note.id}`"
      >
        <div class="font-semibold text-xl">
          <div>{{ note.title }}</div>
        </div>
        <div>{{ note.description }}</div>
      </router-link>
    </div>

    <!-- New Note Modal -->
    <Modal
      v-model="showNewNoteModal"
      @closed="showNewNoteModal = false"
      class="newNoteModal"
    >
      <template v-slot:title>New Note</template>

      <div class="space-y-2">
        <Input
          v-model="title"
          :value="title"
          name="title"
          id="title"
          type="text"
          placeholder="Note Title"
        />

        <Input
          v-model="description"
          :value="description"
          name="description"
          id="description"
          type="text"
          placeholder="Note Description"
        />

        <Button title="Add Note" @click="addNote" class="py-1.5 w-full" />
      </div>
    </Modal>
  </div>
</template>

<script>
import { addNote } from "@/services/notes";
import { useToast } from "vue-toastification";

export default {
  components: {},
  data() {
    return {
      showNewNoteModal: false,
      notes: "",
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  methods: {
    async addNote() {
      let result = await addNote({
        title: this.title,
        description: this.description,
      });

      if (result.status === 200) {
        this.toast.success(result.message);
        this.$store.dispatch("user/getUser");
        this.showNewNoteModal = false;
      } else {
        this.toast.error(result.message);
      }
    },
  },
};
</script>
