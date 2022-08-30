<template>
  <table class="min-w-max w-full table-auto" v-if="this.items">
    <thead>
      <tr class="bg-gray-300 text-gray-600 uppercase text-sm leading-normal">
        <th
          v-for="(column, index) in columns"
          :key="index"
          class="py-3 px-6 text-left"
        >
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody class="text-gray-700 text-sm">
      <tr
        v-for="(item, index) in items"
        :key="index"
        class="border-b border-gray-200"
      >
        <td
          v-for="(column, indexColumn) in columns"
          :key="indexColumn"
          class="py-3 px-6 text-left whitespace-nowrap"
          :class="{
            'bg-gray-100': index % 2 === 0,
            'bg-white': index % 2 !== 0,
          }"
        >
          <div v-if="column === 'edit'">
            <router-link :to="editLink(item)">Edit</router-link>
          </div>
          <div v-else>
            {{ this.formatColumn(item[column], column) }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: ["columns", "items", "editUrl"],
  name: "Table",
  methods: {
    formatColumn(data, index) {
      if (index === "current_price") {
        return this.formatPrice(data);
      }

      if (index === "symbol") {
        return data.toUpperCase();
      }

      return data;
    },
    formatPrice(data) {
      let config;

      if (data < 0.1) {
        config = {
          style: "currency",
          currency: "USD",
          maximumSignificantDigits: 2,
        };
      } else {
        config = {
          style: "currency",
          currency: "USD",
        };
      }

      var formatter = new Intl.NumberFormat("en-US", config);

      return formatter.format(data);
    },
    editLink(item) {
      return this.editUrl + item["id"];
    },
  },
};
</script>
