<template>
  <div class="relative">
    <div class="text-xs absolute right-4 top-2 dark:text-white">
      Last Updated: {{ this.lastUpdated }}
    </div>
    <div class="space-y-4">
      <div
        class="grid grid-cols-1 mt-4 space-y-2 space-x-0 md:grid-cols-2 md:space-y-0 md:space-x-4 xl:grid-cols-4"
      >
        <PositionCard
          :positions="this.$store.getters['user/losingPositions']"
          title="Losses"
          v-if="this.$store.getters['user/losingPositions']"
        />
        <PositionCard
          :positions="this.$store.getters['user/profitPositions']"
          title="Profit"
          v-if="this.$store.getters['user/profitPositions']"
        />
        <EventCard :events="this.events.upcoming" title="Upcoming Events" />
        <EventCard :events="this.events.passed" title="Passed Events" />
      </div>

      <div class="flex">-</div>
    </div>
  </div>
</template>

<script>
import { getEvents } from "@/services/events";
import { getPosition } from "@/services/positions";

import PositionCard from "./components/PositionCard.vue";
import EventCard from "./components/EventCard.vue";

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
      lastUpdated: null,
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
