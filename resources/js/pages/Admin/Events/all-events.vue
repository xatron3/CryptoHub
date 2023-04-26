<template>
  <div>
    <HeaderText>All Events</HeaderText>

    <div class="max-w-6xl flex flex-col space-y-2">
      <div class="flex justify-end space-x-2">
        <Button
          title="Add New"
          class="w-28 self-end"
          @click="this.showNewEventModal = true"
        />
      </div>

      <Table
        :headers="this.headers"
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

import { getEvents, deleteEvent } from "@/services/events";
import { useToast } from "vue-toastification";

export default {
  name: "Events",
  components: { NewEvent },
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      headers: [
        {
          title: "Title",
          value: "title",
        },
        {
          title: "S. Date",
          value: "start_date",
        },
        {
          title: "E. Date",
          value: "end_date",
        },
        {
          title: "#",
          value:
            "<a href='#' class='bg-red-500 text-white hover:bg-red-600 transition-all px-3 py-2 rounded-md'>Delete</a>", // TODO: Hook too func or smth
          customValue: true,
        },
      ],
      showNewEventModal: false,
      page: 1,
      events: null,
      meta: null,
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
};
</script>
