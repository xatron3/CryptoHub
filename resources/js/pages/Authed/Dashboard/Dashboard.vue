<template>
  <div class="relative">
    <div class="space-y-4">
      <div
        class="grid grid-cols-1 space-y-2 space-x-0 md:grid-cols-2 md:space-y-0 md:space-x-4 xl:grid-cols-4"
      >
        <PositionCard
          :positions="this.$store.getters['positions/losingPositions']"
          title="Losses"
          v-if="
            this.$store.getters['positions/losingPositions'] &&
            this.$store.getters['user/role'] >= 10
          "
        />
        <PositionCard
          :positions="this.$store.getters['positions/profitPositions']"
          title="Profit"
          v-if="
            this.$store.getters['positions/profitPositions'] &&
            this.$store.getters['user/role'] >= 10
          "
        />
        <EventCard :events="this.events.upcoming" title="Upcoming Events" />
        <EventCard :events="this.events.passed" title="Passed Events" />
      </div>

      <div class="flex">-</div>
    </div>
  </div>
</template>

<script>
import PositionCard from "./components/PositionCard.vue";
import EventCard from "./components/EventCard.vue";

import { getEvents } from "@/services/events";

export default {
  name: "Dashboard",
  components: { PositionCard, EventCard },
  data() {
    return {
      positions: {
        all: null,
        profit: null,
        losses: null,
      },
      events: {
        upcoming: null,
        passed: null,
      },
    };
  },
  async mounted() {
    this.loadEvents();
  },
  methods: {
    async loadEvents() {
      const upcomingEvents = await getEvents({ limit: 6, passed: false });
      this.events.upcoming = upcomingEvents.data;

      const passedEvents = await getEvents({ limit: 6, passed: true });
      this.events.passed = passedEvents.data;
    },
  },
};
</script>
