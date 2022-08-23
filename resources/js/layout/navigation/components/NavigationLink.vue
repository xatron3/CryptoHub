<template>
  <li class="min-w-max">
    <router-link
      :to="this.path"
      :aria-label="lcTitle"
      class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
    >
      <div v-html="getIcon"></div>
      <span class="-mr-1">{{ this.title }}</span>
    </router-link>
  </li>
</template>

<script>
export default {
  props: ["title", "path"],
  name: "NavigationLink",
  computed: {
    lcTitle() {
      return this.title.toLowerCase();
    },
    getIcon() {
      let icon = null;

      if (this.title === "Dashboard") {
        icon = `<svg class="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z"
            class="fill-current text-cyan-400 dark:fill-slate-600"
          ></path>
          <path
            d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z"
            class="fill-current text-cyan-200 group-hover:text-cyan-300"
          ></path>
          <path
            d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z"
            class="fill-current group-hover:text-sky-300"
          ></path>
        </svg>`;
      } else if (this.title === "Categories") {
        icon = `<svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            class="fill-current text-gray-300 group-hover:text-cyan-300"
            fill-rule="evenodd"
            d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
            clip-rule="evenodd"
          />
          <path
            class="fill-current text-gray-600 group-hover:text-cyan-600"
            d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z"
          />
        </svg>`;
      }

      return icon;
    },
  },
};
</script>
