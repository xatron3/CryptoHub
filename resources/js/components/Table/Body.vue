<template>
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
        <div>
          <!-- Default formats -->
          <div v-if="!header.customValue">
            <span
              v-tooltip.tooltip="
                `${this.format(
                  item[header.hover.value],
                  header.hover.format,
                  index
                )}`
              "
              v-if="header.hover"
            >
              <div
                v-html="this.format(item[header.value], header.format, index)"
              ></div>
            </span>
            <div
              v-else
              v-html="this.format(item[header.value], header.format, index)"
            ></div>
          </div>

          <!-- If customValue is true (allow custom html etc)-->
          <div
            v-else
            v-html="header.value"
            v-on:click="$emit('btn_clicked', item)"
          ></div>
        </div>
      </td>
    </tr>
  </tbody>
</template>

<script>
import {
  formatName,
  formatPercentage,
  formatProfit,
  formatLogo,
} from "./formats";

export default {
  components: {},
  props: ["items", "headers"],
  name: "TableBody",
  methods: {
    format(data, format, index = 0) {
      var _class;
      let currentItem = this.items[index];

      if (format === "price") {
        return `$${nums.formatPrice(data)}`;
      }

      if (format === "percentage") {
        return formatPercentage(data);
      }

      if (format === "profit") {
        return formatProfit(currentItem);
      }

      if (format === "name") {
        return formatName(currentItem);
      }

      /////////////////////
      if (format === "sell_logo") {
        const logo = currentItem["sell_logo"];
        return formatLogo(data, logo);
      }

      if (format === "buy_logo") {
        const logo = currentItem["buy_logo"];
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
  },
};
</script>
