<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-3 gap-12">
      <div class="col-span-3">
        <div
          class="flex space-x-8 mt-2 bg-gray-800 rounded-lg px-8 py-4 text-white"
        >
          <div class="w-48 h-48">
            <img
              class="w-full h-full object-cover rounded-full"
              :src="logoPath"
              :alt="user.name"
            />
          </div>
          <div>
            <div>
              <p class="text-4xl font-semibold">{{ user.name }}</p>
              <p class="text-gray-400 font-medium text-sm">
                joined on {{ joined }}
              </p>
              <p
                class="mt-2 tracking-wide text-white font-medium text-opacity-75"
              >
                {{ user.phone_number }}
              </p>
              <p class="tracking-wide text-white font-medium text-opacity-75">
                {{ user.email }}
              </p>
              <p class="tracking-wide text-white font-medium text-opacity-75">
                {{ user.country }}
              </p>
            </div>
            <div class="mt-8 space-x-8">
              <router-link
                to="/vendor/edit"
                class="px-6 py-2 text-indigo-200 text-sm border border-indigo-300 hover:text-white hover:border-white rounded-full hover:text-white transition duration-300 ease-in-out"
              >
                Edit Information
              </router-link>
              <router-link
                to="/vendor/tickets/new"
                class="px-6 py-2 text-indigo-200 text-sm border border-indigo-300 hover:text-white hover:border-white rounded-full hover:text-white transition duration-300 ease-in-out"
              >
                Create a new Ticket
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3">
        <h2 class="text-2xl font-bold text-gray-700">Stats</h2>
        <div class="mt-4 grid grid-cols-3 gap-12">
          <div class="col-span-1">
            <div
              class="rounded-lg bg-white px-12 py-6 font-semibold overflow-hidden shadow-lg"
            >
              <p class="text-gray-700">Total Events</p>
              <p class="text-6xl text-indigo-500">
                <span>{{ stats.total_events || 0 }}</span>
              </p>
            </div>
          </div>
          <div class="col-span-1">
            <div
              class="rounded-lg bg-white px-12 py-6 font-semibold overflow-hidden shadow-lg"
            >
              <p class="text-gray-700">Total Tickets Sold</p>
              <p class="text-6xl text-indigo-500">
                <span>{{ stats.total_tickets_sold || 0 }}</span>
              </p>
            </div>
          </div>
          <div class="col-span-1">
            <div
              class="rounded-lg bg-white px-12 py-6 font-semibold overflow-hidden shadow-lg"
            >
              <p class="text-gray-700">Total Revenue</p>
              <p class="text-6xl text-gray-800">
                <span class="text-indigo-500">{{ revenue || 0 }}</span>
                <span class="ml-2 uppercase text-base">etb</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/mixins/auth";

import { DateTime } from "luxon";

export default {
  mixins: [Auth],
  components: {},
  data: () => ({
    loading: false,
    stats: {},
  }),
  computed: {
    joined() {
      return DateTime.fromISO(this.user.created_at).toLocaleString(
        DateTime.DATE_FULL
      );
    },
    revenue() {
      return this.stats.total_revenue
        ? (this.stats.total_revenue / 100).toFixed(2)
        : 0;
    },
    logoPath() {
      return (
        process.env.VUE_APP_BACKEND_URL + "/storage/" + this.user.logo_path
      );
    },
  },
  created() {
    this.$http
      .get("/vendor/stats")
      .then(({ data }) => (this.stats = data))
      .catch(err => console.log(err));
  },
};
</script>
