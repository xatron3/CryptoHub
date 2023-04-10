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
      <div>
        <Button title="LINK" class="bg-gray-500 hover:bg-gray-600" />
      </div>
      <textarea
        ref="editArea"
        @contextmenu.prevent="contextMenu($event)"
        class="h-96 bg-gray-900 order-transparent focus:border-transparent focus:ring-0 w-full"
        v-model="this.new_content"
      >
      {{ this.new_content }}
    </textarea
      >
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
          <li @click="copy">Copy</li>
          <li @click="cut">Cut</li>
          <li @click="paste">Paste</li>
        </ul>
      </div>
    </div>

    <div
      v-html="modifyContent(this.new_content)"
      v-if="!edit"
      class="bg-gray-800 note-content"
    ></div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import { deleteNote, updateNote } from "@/services/notes";
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
      new_content: "",
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
  computed: {
    hasChanges() {
      return this.new_content !== this.note.content;
    },
  },
  mounted() {
    document.addEventListener("click", this.handleDocumentClick);
    this.id = this.$route.params.id;
    this.note = this.$store.getters["user/note"](this.id);
    this.new_content = this.note.content;
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleDocumentClick);
  },
  methods: {
    handleDocumentClick(e) {
      const contextMenu = this.$refs.contextMenu;
      if (contextMenu && !contextMenu.contains(e.target)) {
        this.context.show = false;
      }
    },
    contextMenu: function (e) {
      this.context.show = true;
      this.context.menuTop = e.clientY;
      this.context.menuLeft = e.clientX;
    },
    copy() {},
    modifyContent(content) {
      if (content === null) return;

      const linkRegex = /\[link\s+(.*?)\](.*?)\[\/link\]/g;
      const linkReplacement = '<a href="$1" target="_BLANK">$2</a>';
      content = content.replace(linkRegex, linkReplacement);

      const newRowRegex = /(\r\n|\r|\n)/g;
      const newRowReplacement = "<br>";
      content = content.replace(newRowRegex, newRowReplacement);

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
        content: this.new_content,
      });

      if (result.status === 200) {
        this.toast.success(result.message);
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
    color: turquoise;
  }

  h1 {
    font-size: 26px;
  }

  h2 {
    font-size: 22px;
  }
}

.context-menu {
  position: absolute;
  z-index: 1;
  background-color: white;
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
  background-color: #ccc;
}
</style>
