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

      <Table
        :columns="this.columns"
        :items="this.events"
        :meta="this.meta"
        buttonTitle="Delete"
        @button_clicked="deleteEvent"
        @change_page="change_page"
      />
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
import { getEvents, deleteEvent } from "@/services/events";
import { useToast } from "vue-toastification";

export default {
  name: "Events",
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      showNewEventModal: false,
      page: 1,
      events: null,
      meta: null,
      columns: ["title", "start_date", "end_date", "button"],
    };
  },
  async mounted() {
    this.getEvents();
  },
  methods: {
    async getEvents() {
      const eventData = await getEvents({ page: this.page });
      this.events = eventData.data;
      this.meta = eventData.meta;
    },
    async deleteEvent(data) {
      const result = await deleteEvent({ id: data.id });

      if (result.status === 200) {
        this.toast.success(result.message);
      } else {
        this.toast.error(result.message);
      }

      this.getEvents();
    },
    change_page(page) {
      var newPage = xa.setPaginationPage(this.page, page);

      if (this.page !== newPage && newPage <= this.meta.last_page) {
        console.log("test");
        this.page = newPage;
        this.getEvents();
      }
    },
  },
  components: { Table, NewEvent },
};
</script>
