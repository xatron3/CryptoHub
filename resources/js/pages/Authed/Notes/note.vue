<template>
  <div v-if="this.note !== null" class="max-w-6xl flex flex-col space-y-2">
    <!-- Header -->
    <div class="flex items-center">
      <router-link :to="`/notes`"><ChevronLeftIcon class="h-6" /></router-link>
      <header-text>{{ this.note.title }}</header-text>

      <div class="ml-auto space-x-2">
        <Button
          title="Save"
          class="bg-green-500 hover:bg-green-600"
          v-if="hasChanges"
          @click="updateNote"
        />
        <Button
          :title="edit === true ? 'View' : 'Edit'"
          class="bg-yellow-500 hover:bg-yellow-600"
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
    <div v-if="edit" class="w-full space-y-2">
      <ckeditor
        :editor="editor"
        v-model="this.content"
        :config="editorConfig"
      ></ckeditor>

      <!-- <textarea
        ref="editArea"
        @contextmenu.prevent="contextMenu($event)"
        class="h-96 dark:bg-gray-900 p-1 order-transparent focus:border-transparent focus:ring-0 w-full"
        v-model="this.content"
      >
      {{ this.content }}
    </textarea> -->
      <div
        v-if="context.show"
        ref="contextMenu"
        class="context-menu"
        :style="{
          top: context.menuTop + 'px',
          left: context.menuLeft + 'px',
        }"
      >
        <ul>
          <li @click="redo">Redo</li>
          <li @click="undo">Undo</li>
        </ul>
      </div>
    </div>

    <div
      v-html="modifyContent(this.content)"
      v-if="!edit"
      class="dark:bg-gray-800 note-content"
    ></div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { deleteNote, updateNote } from "@/services/notes";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useToast } from "vue-toastification";

export default {
  name: "Note",
  components: {
    ChevronLeftIcon,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        link: {
          addTargetToExternalLinks: true,
        },
      },
      id: null,
      note: null,
      edit: false,
      content: "",
      history: [],
      future: [],
      context: {
        show: false,
        menuTop: 0,
        menuLeft: 0,
      },
    };
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  watch: {
    content(newValue) {
      this.history.push(newValue);
    },
  },
  computed: {
    hasChanges() {
      return this.content !== this.note.content;
    },
  },
  mounted() {
    this.id = this.$route.params.id;
    this.note = this.$store.getters["user/note"](this.id);
    if (this.note.content !== null) this.content = this.note.content;
    else this.content = "";
  },
  methods: {
    fillTextArea(type) {
      this.$refs.editArea.focus();
      let tag,
        length = 0;

      switch (type) {
        case "link":
          length = 6;
          tag = "[link ][/link]";
          break;
        case "line":
          tag = "[/line]";
          break;
        case "header":
          length = 6;
          length = 8;
          tag = "[header][/header]";
          break;
      }

      this.content =
        this.content.slice(0, this.$refs.editArea.selectionStart) +
        tag +
        this.content.slice(this.$refs.editArea.selectionEnd);

      let selectStart = this.$refs.editArea.selectionStart;

      this.$nextTick(() => {
        this.$refs.editArea.setSelectionRange(
          selectStart + length,
          selectStart + length
        );
      });
    },
    modifyContent(content) {
      if (content === null) return;

      return content;
    },
    async deleteNote() {
      if (window.confirm("Are you sure you want to delete this item?")) {
        const result = await deleteNote({ id: this.id });

        if (result.status === 200) {
          this.toast.success(result.message);
          await this.$store.dispatch("user/getUser");
          this.$router.push("/notes");
        } else {
          this.toast.error(result.message);
        }
      }
    },
    async updateNote() {
      const result = await updateNote({
        id: this.id,
        content: this.content,
      });

      if (result.status === 200) {
        this.toast.success(result.message);
        this.note.content = this.content;
        this.edit = false;
        await this.$store.dispatch("user/getUser");
      } else {
        this.toast.error(result.message);
      }
    },
  },
};
</script>

<style lang="scss">
.note-content {
  a {
    color: blue;
  }

  h1 {
    display: inline-block;
    font-size: 26px;
  }

  h2 {
    display: inline-block;
    font-size: 22px;
  }

  table {
    tr {
      td {
        padding: 6px;
        border: 1px solid;
      }
    }
  }
}

.context-menu {
  position: absolute;
  z-index: 1;
  background-color: gray;
  border: 1px solid black;
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 14px;
}

.context-menu li {
  cursor: pointer;
  padding: 5px;
}

.context-menu li:hover {
  background-color: darkgray;
}
</style>
