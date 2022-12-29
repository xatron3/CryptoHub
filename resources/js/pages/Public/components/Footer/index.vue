<template>
  <footer
    class="bg-gray-100 dark:text-gray-600 dark:bg-gray-600 shadow-sm py-5 mt-5"
  >
    <div class="container mx-auto text-center">
      <p class="text-black dark:text-white text-sm">
        ©{{ currentYear() }} MarketCyclop
      </p>
      <div class="flex justify-center space-x-2 mt-2">
        <a href="/disclaimer" class="text-gray-800 dark:text-gray-200 text-xs"
          >Disclaimer</a
        >
        <a href="/terms" class="text-gray-800 dark:text-gray-200 text-xs"
          >Terms</a
        >
        <a
          href="https://docs.coincyclop.com/"
          class="text-gray-800 dark:text-gray-200 text-xs"
          target="_BLANK"
          >Documentation</a
        >
      </div>
      <div class="inline-flex mt-2 justify-center">
        <a
          href="https://twitter.com/CoinCyclop"
          class="text-gray-800 dark:text-gray-200"
          target="_BLANK"
        >
          <i class="fab fa-twitter"></i>
        </a>

        <a
          href="https://t.me/CoinCyclop"
          class="ml-3 text-gray-800 dark:text-gray-200"
          target="_BLANK"
        >
          <i class="fab fa-telegram-plane"></i>
        </a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  methods: {
    currentYear() {
      const current = new Date();
      return current.getFullYear();
    },
  },
};
</script>

<style></style>
