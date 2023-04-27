<template>
  <div class="max-w-6xl flex flex-col space-y-2">
    <div class="flex w-full">
      <HeaderText>All Posts</HeaderText>
      <Button title="NEW POST" class="ml-auto" />
    </div>

    <Table
      :headers="this.headers"
      :items="this.$store.getters['posts/all']"
      buttonTitle="Edit"
      @button_clicked="edit_post"
    />
  </div>
</template>

<script>
export default {
  name: "all-posts",
  data() {
    return {
      headers: [
        {
          title: "Title",
          value: "title",
        },
        {
          title: "Edit",
          value:
            "<div class='bg-green-500 text-white hover:bg-green-600 transition-all px-3 py-2 rounded-md inline-flex cursor-pointer'>Edit</div>",
          customValue: true,
        },
      ],
    };
  },
  methods: {
    edit_post(data) {
      this.$router.push(`/admin/post/edit/${data.id}`);
    },
  },
};
</script>
