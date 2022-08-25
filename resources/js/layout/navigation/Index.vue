<template>
  <!-- component -->
  <!-- 
    add this in your css

    @layer components {
      .sidebar{
        transition:all .4s ease-in-out;
      }
    }

   w-[3.35rem]
  -->

  <div class="min-h-screen bg-gray-100">
    <div class="sidebar min-h-screen overflow-hidden border-r w-56 shadow-sm">
      <div class="flex h-screen flex-col justify-between pt-2 pb-6">
        <div>
          <div class="w-max p-2.5 mb-6">Logo</div>
          <div class="mx-4">
            <NavigationHeader title="General" />
            <NavigationLink path="/" title="Dashboard"></NavigationLink>
            <NavigationLink path="/test" title="Courses"></NavigationLink>
          </div>
        </div>
        <div class="w-max -mb-3">
          <a
            href="#"
            class="group flex items-center space-x-4 rounded-md px-4 py-3 text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 group-hover:fill-cyan-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"
              />
            </svg>
            <span class="group-hover:text-gray-700">Settings</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationLink from "./components/NavigationLink.vue";
import NavigationHeader from "./components/NavigationHeader.vue";

export default {
  name: "Navigation",
  data() {
    return {
      title: "Navigation",
    };
  },
  components: {
    NavigationLink,
    NavigationHeader,
  },
};
</script>
