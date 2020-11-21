<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-3 gap-12">
      <div class="col-span-3">
        <div
          class="flex space-x-8 mt-2 bg-gray-800 rounded-lg px-8 py-4 text-white"
        >
          <div class="w-48">
            <img
              class="object-cover rounded-full"
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&h=500&q=80"
              alt="Profile Picture"
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
              <button
                class="px-6 py-2 text-indigo-200 text-sm border border-indigo-300 hover:text-white hover:border-white rounded-full hover:text-white transition duration-300 ease-in-out"
              >
                Edit Information
              </button>
              <button
                class="px-6 py-2 text-indigo-200 text-sm border border-indigo-300 hover:text-white hover:border-white rounded-full hover:text-white transition duration-300 ease-in-out"
              >
                Create a new Ticket
              </button>
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
              <p class="text-6xl text-indigo-500">54</p>
            </div>
          </div>
          <div class="col-span-1">
            <div
              class="rounded-lg bg-white px-12 py-6 font-semibold overflow-hidden shadow-lg"
            >
              <p class="text-gray-700">Total Tickets Sold</p>
              <p class="text-6xl text-indigo-500">1,209</p>
            </div>
          </div>
          <div class="col-span-1">
            <div
              class="rounded-lg bg-white px-12 py-6 font-semibold overflow-hidden shadow-lg"
            >
              <p class="text-gray-700">Total Revenue</p>
              <p class="text-6xl text-gray-800">
                <span class="text-indigo-500">67,890</span>
                <span class="ml-2 uppercase text-base">etb</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-3">
        <h2 class="text-2xl font-bold text-gray-700">Latest Activity</h2>
        <div>Activity List</div>
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
  }),
  computed: {
    joined() {
      return DateTime.fromISO(this.user.created_at).toLocaleString(
        DateTime.DATE_FULL
      );
    },
  },
  created() {},
};
</script>
