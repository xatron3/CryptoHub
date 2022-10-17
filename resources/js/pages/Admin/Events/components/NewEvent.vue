<template>
  <vue-final-modal v-model="show" @closed="$emit('hideModal')">
    <div class="space-y-2 max-w-sm mx-auto">
      <Input
        v-model="this.event.title"
        :value="this.event.title"
        id="title"
        name="title"
        placeholder="Title"
      />

      <div>
        <label for="test" class="text-sm font-medium ml-0.5 dark:text-white"
          >Description</label
        >
        <textarea
          class="border w-full rounded-md p-2 text-black"
          id="test"
          placeholder="Description"
        ></textarea>
      </div>

      <div class="grid grid-cols-2 space-x-2">
        <div>
          <label
            for="start_date"
            class="text-sm font-medium ml-0.5 dark:text-white"
            >Start Date</label
          >
          <Datepicker
            v-model="this.event.start_date"
            :enableTimePicker="false"
            format="dd-MM-yyyy"
            type="date"
          />
        </div>

        <div>
          <label
            for="end_date"
            class="text-sm font-medium ml-0.5 dark:text-white"
            >End Date</label
          >
          <Datepicker
            v-model="this.event.end_date"
            :enableTimePicker="false"
            format="dd-MM-yyyy"
            type="date"
          />
        </div>
      </div>

      <Button title="Add Event" @click="addEvent" class="mx-auto w-full" />
    </div>

    <button class="vfm__close" @click="$emit('hideModal')">X</button>
  </vue-final-modal>
</template>

<script>
import { useToast } from "vue-toastification";
import { addEvent } from "@/services/events";
import { ref } from "vue";

export default {
  props: ["show"],
  name: "New Event",
  setup() {
    // Get toast interface
    const toast = useToast();

    return { toast };
  },
  data() {
    return {
      event: {
        title: null,
        description: null,
        start_date: null,
        end_date: null,
      },
    };
  },
  methods: {
    async addEvent() {
      let result = await addEvent(this.event);
      if (result.status === 200) {
        this.toast.success(result.message);
        Object.keys(this.event).forEach((i) => (this.event[i] = null));
        this.$emit("hideModal");
        this.$emit("refreshEvents");
      } else {
        this.toast.error(result.message);
      }
    },
  },
};
</script>
