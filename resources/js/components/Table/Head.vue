<template>
  <thead>
    <tr
      class="bg-gray-300 dark:bg-gray-900 text-gray-600 dark:text-gray-100 uppercase text-sm leading-normal"
    >
      <th
        v-for="(header, index) in headers"
        :key="index"
        class="py-3 px-6 text-left"
      >
        {{ header.title }}
      </th>
    </tr>
  </thead>
</template>

<script>
export default {
  components: {},
  props: ["headers"],
  name: "TableHead",
  methods: {},
};
</script>
