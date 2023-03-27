<template>
  <Modal v-model="show" @closed="$emit('hideModal')" class="newNoteModal">
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

      <Button title="Add Note" @click="addNote" class="py-1.5 w-full" />
    </div>
  </Modal>
</template>

<script>
import { addNote } from "@/services/notes";
import { useToast } from "vue-toastification";

export default {
  props: ["show"],
  name: "NewNoteModal",
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      title: "",
    };
  },
  methods: {
    async addNote() {
      let result = await addNote({ title: this.title, content: "a" });

      if (result.status === 200) {
        this.toast.success(result.message);

        this.$emit("hideModal");
      } else {
        this.toast.error(result.message);
      }
    },
  },
};
</script>
