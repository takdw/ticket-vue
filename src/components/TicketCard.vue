<template>
  <div>
    <router-link class="block h-full" :to="`/ticket/${ticket.id}`">
      <div
        class="relative h-full bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition ease-in-out duration-300 cursor-pointer"
      >
        <div class="absolute top-0 left-0">
          <div class="ml-4 mt-4 bg-white bg-opacity-25 px-2 py-1 rounded-lg">
            <p class="font-semibold">
              <span class="uppercase text-sm text-gray-200">etb</span>
              <span class="ml-1 text-xl text-white">{{ price }}</span>
            </p>
          </div>
        </div>
        <div class="h-56 overflow-hidden">
          <img
            class="w-full object-fit"
            :src="posterPath"
            :alt="ticket.title"
          />
        </div>
        <div class="flex p-6 space-x-6">
          <div class="">
            <p class="text-center leading-tight">
              <span class="text-indigo-500 font-semibold uppercase">
                {{ month }}
              </span>
              <br />
              <span class="text-4xl font-semibold">
                {{ day }}
              </span>
            </p>
          </div>
          <div>
            <h2 class="text-xl font-semibold">
              {{ ticket.title }}
            </h2>
            <p class="mt-2 leading-tight text-gray-700">
              {{ ticket.subtitle }}
            </p>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  props: ["ticket"],
  data: () => ({
    date: {},
  }),
  created() {
    this.date = DateTime.fromISO(this.ticket.date);
  },
  computed: {
    month() {
      return this.date.toFormat("LLL");
    },
    day() {
      return this.date.toFormat("d");
    },
    price() {
      return (this.ticket.price / 100).toFixed(2);
    },
    posterPath() {
      return process.env.VUE_APP_BACKEND_URL + "storage/" + this.ticket.poster;
    },
  },
};
</script>
