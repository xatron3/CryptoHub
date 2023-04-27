<template>
  <div class="space-y-2 max-w-7xl" v-if="post !== null">
    <div class="flex items-center">
      <router-link :to="`/admin/posts`"
        ><ChevronLeftIcon class="h-6"
      /></router-link>
      <header-text>{{ post.title }}</header-text>
    </div>

    <div>
      Slug:
      <a :href="`/article/${post.slug}`" target="_blank"
        >https://127.0.0.1:8000/article/{{ post.slug }}</a
      >
    </div>

    <div class="flex space-x-2">
      <div class="w-3/4">
        <ckeditor
          :editor="editor"
          v-model="post.content"
          :config="editorConfig"
        ></ckeditor>
      </div>

      <div class="w-1/4 dark:bg-gray-750 rounded-md p-2">X</div>
    </div>

    <div></div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/24/outline";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  name: "edit-post",
  components: {
    ChevronLeftIcon,
  },
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        height: "300px",
      },
      post: null,
    };
  },
  mounted() {
    this.post = this.$store.getters["posts/get"](
      parseInt(this.$route.params.id)
    );
  },
};
</script>

<style>
.ck-content {
  min-height: 400px;
}
</style>
