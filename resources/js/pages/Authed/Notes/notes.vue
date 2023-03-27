<template>
  <div class="max-w-2xl">
    <Button title="Add New" @click="this.showNewNoteModal = true" />
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
