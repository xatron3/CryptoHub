<template>
  <div class="overflow-auto">
    <table class="min-w-max w-full table-auto" v-if="this.items">
      <Head :headers="this.headers" />

      <tbody class="text-gray-700 dark:text-gray-100 text-sm">
        <tr
          v-for="(item, index) in items"
          :key="index"
          class="border-b border-gray-200 dark:border-gray-600"
        >
          <td
            v-for="(header, indexColumn) in headers"
            :key="indexColumn"
            class="py-3 px-6 text-left whitespace-nowrap"
            :class="{
              'bg-gray-100 dark:bg-gray-800': index % 2 === 0,
              'bg-white dark:bg-gray-700': index % 2 !== 0,
            }"
          >
            <!-- <div v-if="header === 'button'">
              <Button
                :title="buttonTitle"
                "
                class="py-1.5"
              />
            </div> -->
            <div>
              <div
                v-html="this.format(item[header.value], header.format)"
                v-if="!header.customValue"
              ></div>
              <div
                v-else
                v-html="header.value"
                v-on:click="$emit('button_clicked', item)"
              ></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div
    class="mt-3 mx-auto rounded-md overflow-hidden flex justify-center"
    v-if="this.meta"
  >
    <div
      v-for="meta in this.meta.links"
      v-bind:key="meta.label"
      class="px-2 py-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-900 transition-all"
      :class="{
        'bg-gray-200 dark:bg-gray-600': meta.active,
        'bg-gray-100 dark:bg-gray-700': !meta.active,
      }"
      v-on:click="$emit('change_page', getPaginationPage(meta.label))"
    >
      <span v-html="meta.label"></span>
    </div>
  </div>
</template>

<script>
// Table Components
import Head from "./Head.vue";

import LaravelVuePagination from "laravel-vue-pagination";

export default {
  components: {
    LaravelVuePagination,
    Head,
  },
  props: ["headers", "items", "buttonTitle", "meta"],
  emits: ["button_clicked", "change_page"],
  name: "Table",
  methods: {
    format(data, column) {
      var _class;

      if (column === "price") {
        return `$${nums.formatPrice(data)}`;
      }

      if (column === "percentage") {
        if (data === 0) {
          _class = "text-yellow-500";
        } else if (data > 0) {
          _class = "text-green-500";
        } else {
          _class = "text-red-500";
        }

        return `<span class="${_class}">${parseFloat(data).toFixed(2)}%</span>`;
      }

      if (column === "profit") {
        if (data === 0) {
          _class = "text-yellow-500";
        } else if (data > 0) {
          _class = "text-green-500";
        } else {
          _class = "text-red-500";
        }

        if (data["close_amount"] === null) {
          return `<div class="flex space-x-1 items-center"><img src="${
            data["sell_logo"]
          }" class="w-5 h-5"> <span class="${_class}">${nums.formatPrice(
            data,
            2
          )} ${data["sell_symbol"]}</span> 
          <span class="text-xs">
            (${parseFloat(
              nums.getPercentageIncrease(
                data["current_sell_price"],
                data["buy_price"]
              )
            ).toFixed(2)}%)
            </span>
            </div>`;
        } else {
          return `<div class="flex space-x-1 items-center"><img src="${
            data["sell_logo"]
          }" class="w-5 h-5"> <span class="${_class}">${nums.formatPrice(
            data,
            2
          )} ${data["sell_symbol"]}</span> 
          <span class="text-xs">
           
            </span>
            </div>`;
        }
      }

      /////////////////////

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
        if (data[column] > data["buy_price"]) {
          _class = "text-green-500";
        } else {
          _class = "text-red-500";
        }

        return `<span class="${_class}">${nums.formatPrice(
          data[column]
        )}</span>`;
      }

      if (column === "close_amount") {
        return `${data[column]} ${data["sell_symbol"]}`;
      }

      if (column === "buy_price") {
        return `${nums.formatPrice(data[column])} ${data["sell_symbol"]}`;
      }

      if (column === "market_cap") {
        return `$${data[column].toLocaleString("en-US")}`;
      }

      return data;
    },
    getPaginationPage(label) {
      return xa.getPaginationPage(label);
    },
  },
};
</script>
