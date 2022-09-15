<template>
  <div class="flex flex-col w-1/4 rounded-md bg-slate-300 px-4 py-2">
    <h2 class="text-2xl">{{ this.title }}</h2>
    <div class="grid grid-cols-4">
      <span class="col-span-2">Event</span>
      <span class="col-span-2">Start Date</span>
    </div>

    <div
      v-for="item in events"
      :key="item"
      class="grid grid-cols-4 border-b py-0.5"
    >
      <span class="col-span-2 flex items-center space-x-1.5">
        <span>{{ item.title }}</span>
      </span>
      <span class="col-span-2">{{ item.start_date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["events", "title"],
  name: "EventCard",
  methods: {},
};
</script>
