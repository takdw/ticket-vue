<template>
  <div class="container mx-auto">
    <h2 class="text-2xl font-bold text-gray-700">Tickets</h2>
    <div class="my-4 border-t border-b grid grid-cols-3 py-4">
      <div class="col-span-1">
        <input
          @keyup="search"
          v-model="searchQuery"
          class="form-input w-full"
          placeholder="Search..."
        />
      </div>
    </div>
    <div class="relative" :class="{ 'py-24': loading && !hasTickets }">
      <div
        v-if="loading"
        class="absolute inset-0 grid place-items-center py-12 z-50 rounded-lg"
        :class="{ 'bg-black bg-opacity-25': hasTickets }"
      >
        <span
          class="block h-8 w-8 border-4 rounded-full spin"
          :class="{
            'border-white': hasTickets,
            'border-gray-800': !hasTickets,
          }"
          style="border-bottom-color: transparent"
        ></span>
      </div>
      <div v-if="hasTickets" class="grid grid-cols-3 gap-12">
        <TicketCard
          v-for="(ticket, index) in tickets"
          :key="`event-grid-${index}`"
          :ticket="ticket"
        />
      </div>
      <div v-if="!loading && !hasTickets" class="py-12">
        <p class="font-bold text-gray-700 text-center">
          There are no upcoming tickets available.
        </p>
      </div>
    </div>
    <div v-if="hasPages" class="mt-8 grid place-items-center tickets-page">
      <pagination
        :data="paginator"
        :limit="3"
        @pagination-change-page="getTickets"
      />
    </div>
  </div>
</template>

<script>
import { debounce } from "debounce";

import TicketCard from "@/components/TicketCard";

export default {
  components: {
    TicketCard,
  },
  data: () => ({
    paginator: {
      data: [],
    },
    loading: false,
    searchQuery: "",
  }),
  watch: {
    searchQuery(newValue) {
      this.$router.replace({
        query: {
          ...this.$route.query,
          search: newValue,
        },
      });
    },
  },
  computed: {
    tickets() {
      return this.paginator.data;
    },
    hasTickets() {
      return !!this.tickets.length;
    },
    hasPages() {
      return this.paginator.last_page > 1;
    },
  },
  created() {
    if (this.$route.query.search) {
      this.searchQuery = this.$route.query.search;
    }

    this.getTickets();
  },
  methods: {
    getTickets(page = 1) {
      this.loading = true;

      const params = [];

      if (page !== 1) params.push("page=" + page);
      if (this.searchQuery) params.push("search=" + this.searchQuery);

      this.$http
        .get("tickets?" + params.join("&"))
        .then(response => (this.paginator = response.data))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
    },
    search: debounce(function () {
      this.getTickets();
    }, 300),
  },
};
</script>
