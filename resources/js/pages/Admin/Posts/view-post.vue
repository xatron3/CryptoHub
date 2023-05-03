<template>
  <div class="space-y-2 max-w-7xl">
    <div class="flex items-center">
      <router-link :to="`/admin/posts`"
        ><ChevronLeftIcon class="h-6"
      /></router-link>
      <input
        v-model="this.post.title"
        class="text-2xl font-semibold h-font bg-transparent w-2/3"
      />
    </div>

    <div class="space-x-1 flex items-center">
      <span class="font-semibold">Permalink:</span>
      <span class="text-xs"
        >https://127.0.0.1:8000/article/<input
          v-model="this.post.slug"
          class="bg-gray-50 w-auto"
      /></span>
    </div>

    <div class="flex space-x-2">
      <div class="w-3/4">
        <ckeditor
          :editor="editor"
          v-model="this.post.content"
          :config="editorConfig"
        ></ckeditor>
      </div>

      <div class="w-1/4 dark:bg-gray-750 flex flex-col space-y-2">
        <accordion :open="true">
          <template v-slot:header>Publish</template>
          <template v-slot:content>
            <!-- Post info -->
            <div class="text-sm mb-1" v-if="edit">
              <div class="grid grid-cols-3">
                <div class="col-span-1 font-semibold">View Post</div>
                <div class="col-span-2">
                  <a :href="`/article/${this.post.slug}`" target="_blank"
                    ><LinkIcon class="w-4"
                  /></a>
                </div>
              </div>
              <div class="grid grid-cols-3">
                <div class="col-span-1 font-semibold">Created</div>
                <div class="col-span-2">{{ this.post.created }}</div>
              </div>

              <div class="grid grid-cols-3">
                <div class="col-span-1 font-semibold">Last Updated</div>
                <div class="col-span-2">{{ this.post.updated }}</div>
              </div>
            </div>
            <!-- Delete/Update posts -->
            <div class="flex items-end">
              <div
                class="text-red-500 text-xs cursor-pointer"
                v-if="edit"
                @click="deletePost"
              >
                Move to trash
              </div>

              <div class="ml-auto">
                <Button
                  v-if="edit"
                  title="UPDATE POST"
                  @click="updatePost"
                ></Button>

                <Button
                  v-if="!edit"
                  title="PUBLISH POST"
                  @click="publishPost"
                ></Button>
              </div>
            </div>
          </template>
        </accordion>

        <accordion :open="true">
          <template v-slot:header>IMAGE</template>
          <template v-slot:content>t</template>
        </accordion>
      </div>
    </div>

    <div></div>
  </div>
</template>

<script>
import { ChevronLeftIcon, LinkIcon } from "@heroicons/vue/24/outline";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useToast } from "vue-toastification";
import { updatePost, deletePost, addPost } from "@/services/posts";

export default {
  name: "edit-post",
  components: {
    ChevronLeftIcon,
    LinkIcon,
  },
  data() {
    return {
      edit: false,
      editor: ClassicEditor,
      editorConfig: {
        height: "300px",
      },
      post: {},
    };
  },
  watch: {
    "post.title": function (newVal, oldVal) {
      if (!this.edit) {
        if (this.post.slug === oldVal || this.post.slug === undefined) {
          this.post.slug = this.post.title;
        }
      }
    },
  },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  mounted() {
    if (this.$route.params.id) this.edit = true;
    else this.edit = false;

    if (this.$route.params.id) {
      this.post = this.$store.getters["posts/get"](
        parseInt(this.$route.params.id)
      );
    }
  },
  methods: {
    async deletePost() {
      if (window.confirm("Are you sure you want to delete this post?")) {
        const result = await deletePost({ id: this.post.id });

        if (result.status === 200) {
          this.toast.success(result.message);
          await this.$store.dispatch("posts/load");
          this.$router.push("/admin/posts");
        } else {
          this.toast.error(result.message);
        }
      }
    },
    async updatePost() {
      const result = await updatePost(this.post);

      if (result.status === 200) {
        this.$router.push("/admin/posts");
        this.toast.success(result.message);
      } else {
        this.toast.error(result.message);
      }
    },
    async publishPost() {
      const result = await addPost(this.post);

      if (result.status === 400) {
        this.toast.error(result.message);
      } else {
        await this.$store.dispatch("posts/load");
        this.toast.success(result.message);
        this.$router.push(`/admin/post/edit/${result.data.id}`);
        this.edit = true;
      }
    },
  },
};
</script>
