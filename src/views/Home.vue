<template>
  <div>
    <div class="container mx-auto">
      <div
        class="-mx-12 bg-cover bg-center rounded-xl"
        style="
          height: 550px;
          background-image: url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80');
        "
      ></div>
    </div>
    <div class="container mx-auto -mt-12 px-24">
      <div class="bg-indigo-500 rounded-lg p-6 shadow-xl">
        <input
          class="form-input w-full text-xl py-4 rounded-lg"
          placeholder="Search for tickets..."
        />
      </div>
    </div>
    <div class="mt-12"></div>
    <div class="relative container mx-auto" :class="{ 'py-12': loading }">
      <div
        v-if="loading"
        class="absolute inset-0 grid place-items-center py-12 z-50"
      >
        <span
          class="block h-8 w-8 border-4 rounded-full spin border-gray-800"
          style="border-bottom-color: transparent"
        ></span>
      </div>
      <template v-else>
        <template v-if="hasTickets">
          <h2 class="text-2xl font-bold text-gray-700">Upcoming Tickets</h2>
          <div class="grid grid-cols-3 gap-12 py-6">
            <TicketCard
              v-for="(ticket, index) in tickets"
              :key="`event-grid-${index}`"
              :ticket="ticket"
            />
          </div>
          <div class="grid place-items-center">
            <router-link
              class="font-bold text-gray-600 text-center hover:text-gray-900 transition duration-300 ease-in-out"
              to="/tickets"
              >View all tickets</router-link
            >
          </div>
        </template>
        <div v-else class="py-12">
          <p class="font-bold text-gray-700 text-center">
            There are no upcoming tickets available.
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import TicketCard from "@/components/TicketCard";

export default {
  components: {
    TicketCard,
  },
  data: () => ({
    tickets: [],
    loading: false,
  }),
  computed: {
    hasTickets() {
      return !!this.tickets.length;
    },
  },
  created() {
    this.loading = true;
    this.$http
      .get("tickets?limit=6")
      .then(response => (this.tickets = response.data))
      .catch(err => console.log(err))
      .finally(() => (this.loading = false));
  },
};
</script>
