<template>
  <div>
    <div class="max-w-6xl flex flex-col space-y-2">
      <div class="flex justify-end space-x-2">
        <Button
          title="Add New"
          class="w-28 self-end"
          @click="this.showNewEventModal = true"
        />
      </div>

      <Table :columns="this.columns" :items="this.events" />
    </div>

    <NewEvent
      @hideModal="this.showNewEventModal = false"
      @refreshEvents="this.getEvents()"
      :show="this.showNewEventModal"
    />
  </div>
</template>

<script>
import NewEvent from "./components/NewEvent.vue";

import Table from "@/components/Table.vue";
import { getEvents } from "@/services/events";

export default {
  name: "Events",
  data() {
    return {
      showNewEventModal: false,
      events: null,
      columns: ["title", "start_date", "end_date"],
    };
  },
  async mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      this.events = await getEvents();
    },
  },
  components: { Table, NewEvent },
};
</script>
