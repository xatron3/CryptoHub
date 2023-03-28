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
        class="bg-gray-700 p-2 rounded-md space-y-1 cursor-pointer"
        :to="`/note/${note.id}`"
      >
        <div class="font-semibold">
          <div>{{ note.title }}</div>
        </div>
        <div>{{ note.description }}</div>
      </router-link>
    </div>

    <!-- Export Modal -->
    <NewNoteModal
      :show="this.showNewNoteModal"
      @hideModal="this.showNewNoteModal = false"
    />
  </div>
</template>

<script>
import NewNoteModal from "./components/NewNoteModal.vue";

export default {
  components: {
    NewNoteModal,
  },
  data() {
    return {
      showNewNoteModal: false,
      notes: "",
    };
  },
};
</script>
