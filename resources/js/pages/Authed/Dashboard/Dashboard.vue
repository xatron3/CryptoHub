<template>
  <div class="relative">
    <div class="text-xs absolute right-4 top-2 dark:text-white">
      Last Updated: {{ this.lastUpdated }}
    </div>
    <div class="space-y-4">
      <div class="flex space-x-4 mt-4">
        <PositionCard :positions="this.positions.losses" title="Losses" />
        <PositionCard :positions="this.positions.profit" title="Profit" />
        <EventCard :events="this.events.upcoming" title="Upcoming Events" />
        <EventCard :events="this.events.passed" title="Passed Events" />
      </div>

      <div class="flex">Wo</div>
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
      symbol: "BITSTAMP:BTCUSD",
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
    this.loadAndSortPositions();
    this.loadEvents();
    setInterval(this.loadAndSortPositions, 60000);
  },
  methods: {
    async loadAndSortPositions() {
      this.positions.all = await getPosition({
        grouped: true,
        sort_by: "profit",
      });

      this.positions.profit = this.positions.all.filter((item) => {
        return item.current_sell_price >= item.buy_price;
      });

      this.positions.losses = this.positions.all.filter((item) => {
        return item.current_sell_price < item.buy_price;
      });

      const today = new Date();
      this.lastUpdated = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    },
    async loadEvents() {
      this.events.upcoming = await getEvents({ limit: 6, passed: false });
      this.events.passed = await getEvents({ limit: 6, passed: true });
    },
  },
};
</script>
