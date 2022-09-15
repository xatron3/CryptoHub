<template>
  <div class="max-w-6xl flex flex-col space-y-2">
    <div class="flex justify-end space-x-2">
      <Button title="Add New" class="w-28 self-end" />
    </div>

    <Table :columns="this.columns" :items="this.events" />
  </div>
</template>

<script>
import Table from "../../../components/Table.vue";
import { getEvents } from "../../../services/events";

export default {
  name: "Assets",
  data() {
    return {
      events: null,
      columns: ["title", "start_date", "end_date"],
    };
  },
  async mounted() {
    this.events = await getEvents();
  },
  components: { Table },
};
</script>
