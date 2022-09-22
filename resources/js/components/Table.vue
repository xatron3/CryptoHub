<template>
  <table class="min-w-max w-full table-auto" v-if="this.items">
    <thead>
      <tr
        class="bg-gray-300 dark:bg-gray-900 text-gray-600 dark:text-gray-100 uppercase text-sm leading-normal"
      >
        <th
          v-for="(column, index) in columns"
          :key="index"
          class="py-3 px-6 text-left"
        >
          {{ this.formatHeader(column) }}
        </th>
      </tr>
    </thead>
    <tbody class="text-gray-700 dark:text-gray-100 text-sm">
      <tr
        v-for="(item, index) in items"
        :key="index"
        class="border-b border-gray-200 dark:border-gray-600"
      >
        <td
          v-for="(column, indexColumn) in columns"
          :key="indexColumn"
          class="py-3 px-6 text-left whitespace-nowrap"
          :class="{
            'bg-gray-100 dark:bg-slate-800': index % 2 === 0,
            'bg-white dark:bg-slate-700': index % 2 !== 0,
          }"
        >
          <div v-if="column === 'button'">
            <Button
              :title="buttonTitle"
              v-on:click="$emit('button_clicked', item)"
              class="py-1.5"
            />
          </div>
          <div v-else>
            <div v-html="this.formatColumn(item, column)"></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Button from "./Button.vue";

export default {
  props: ["columns", "items", "buttonTitle"],
  name: "Table",
  components: {
    Button,
  },
  methods: {
    formatColumn(data, column) {
      var _class;

      if (column === "current_price") {
        return this.formatPrice(data[column]);
      }

      if (column === "name") {
        return `<div class="flex space-x-1 items-center"><img src="${data["logo"]}" class="w-7 h-7"> <span>${data[column]}</span></div>`;
      }

      if (column === "sell_amount") {
        return `<div class="flex space-x-1 items-center"><img src="${
          data["sell_logo"]
        }" class="w-6 h-6"> <span>${nums.formatPrice(data[column])} ${
          data["sell_symbol"]
        }</span></div>`;
      }

      if (column === "buy_amount") {
        return `<div class="flex space-x-1 items-center"><img src="${
          data["buy_logo"]
        }" class="w-6 h-6"> <span>${nums.formatPrice(data[column])} ${
          data["buy_symbol"]
        }</span></div>`;
      }

      if (column === "current_sell_price") {
        if (data[column] > data["price"]) {
          _class = "text-green-500";
        } else {
          _class = "text-red-500";
        }

        return `<span class="${_class}">${nums.formatPrice(
          data[column]
        )}</span> <span class="text-xs">(${nums
          .getPercentageIncrease(data[column], data["buy_price"])
          .toFixed(2)}%)</span>`;
      }

      if (column === "close_amount") {
        return `${data[column]} ${data["sell_symbol"]}`;
      }

      if (column === "profit") {
        if (data[column] === 0) {
          _class = "text-yellow-500";
        } else if (data[column] > 0) {
          _class = "text-green-500";
        } else {
          _class = "text-red-500";
        }

        return `<div class="flex space-x-1 items-center"><img src="${data["sell_logo"]}" class="w-5 h-5"> <span class="${_class}">${data[column]} ${data["sell_symbol"]}</span></div>`;
      }

      if (column === "buy_price") {
        return `${data[column]} ${data["sell_symbol"]}`;
      }

      return data[column];
    },
    formatHeader(column) {
      if (column === "sell_amount") {
        return "Sell Amount";
      }

      if (column === "button") {
        return this.buttonTitle;
      }

      return column;
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
  },
};
</script>
