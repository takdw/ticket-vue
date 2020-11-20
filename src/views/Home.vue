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
          placeholder="Search for events..."
        />
      </div>
    </div>
    <div class="mt-12"></div>
    <div class="container mx-auto">
      <h2 class="text-2xl font-bold text-gray-700">Upcoming Events</h2>
      <div class="grid grid-cols-3 gap-12 py-6">
        <TicketCard
          v-for="(ticket, index) in tickets"
          :key="`event-grid-${index}`"
          :ticket="ticket"
        />
      </div>
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
  }),
  created() {
    this.$http
      .get("tickets")
      .then(response => (this.tickets = response.data))
      .catch(err => console.log(err));
  },
};
</script>
