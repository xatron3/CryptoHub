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
                v-html="this.format(item[header.value], header.format, index)"
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

import { formatPercentage, formatProfit, formatLogo } from "./formats";

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
    format(data, format, index = 0) {
      var _class, _data;

      if (format === "price") {
        return `$${nums.formatPrice(data)}`;
      }

      if (format === "percentage") {
        return formatPercentage(data);
      }

      if (format === "profit") {
        const logo = this.items[index]["sell_logo"];
        return formatProfit(data, logo);
      }

      /////////////////////
      if (format === "logo") {
        const logo = this.items[index]["sell_logo"];
        return formatLogo(data, logo);
      }

      if (format === "buy_amount") {
        return `<div class="flex space-x-1 items-center"><img src="${
          data["buy_logo"]
        }" class="w-6 h-6"> <span>${nums.formatPrice(data[format])} ${
          data["buy_symbol"]
        }</span></div>`;
      }

      if (format === "current_sell_price") {
        if (data[format] > data["buy_price"]) {
          _class = "text-green-500";
        } else {
          _class = "text-red-500";
        }

        return `<span class="${_class}">${nums.formatPrice(
          data[format]
        )}</span>`;
      }

      if (format === "close_amount") {
        return `${data[format]} ${data["sell_symbol"]}`;
      }

      if (format === "buy_price") {
        return `${nums.formatPrice(data[format])} ${data["sell_symbol"]}`;
      }

      if (format === "market_cap") {
        return `$${data[format].toLocaleString("en-US")}`;
      }

      return data;
    },
    getPaginationPage(label) {
      return xa.getPaginationPage(label);
    },
  },
};
</script>
