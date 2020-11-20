<template>
  <div
    class="w-full bg-white shadow rounded-lg px-8 py-4 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
  >
    <div class="grid grid-cols-5 gap-2 justify-between">
      <div class="col-span-3">
        <p class="font-semibold text-gray-700">
          {{ ticket.ticket.title }}
        </p>
        <div class="mt-2 flex items-center space-x-2">
          <svg
            class="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p class="text-sm">{{ ticket.ticket.venue }}</p>
        </div>
        <div class="flex items-center space-x-2">
          <svg
            class="w-5 h-5 text-gray-600"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="text-sm">{{ date }} at {{ time }}</span>
        </div>
      </div>
      <div class="col-span-1 grid flex items-center justify-end">
        <p>
          <svg
            class="w-8 h-8 text-green-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </p>
      </div>
      <div class="col-span-1 flex items-center justify-end">
        <div class="text-3xl font-semibold text-gray-600 tracking-widest">
          {{ ticket.code }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  props: ["ticket"],
  data: () => ({
    dateObj: {},
  }),
  created() {
    this.dateObj = DateTime.fromISO(this.ticket.ticket.date);
  },
  computed: {
    time() {
      return this.dateObj.toLocaleString(DateTime.TIME_SIMPLE);
    },
    date() {
      return this.dateObj.toLocaleString(DateTime.DATE_FULL);
    },
  },
};
</script>
