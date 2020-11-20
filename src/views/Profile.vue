<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-3 gap-12">
      <div class="col-span-1">
        <div class="mt-2 bg-indigo-500 rounded-lg p-4 text-white text-center">
          <div class="px-12">
            <img
              class="object-cover rounded-full"
              src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&h=500&q=80"
              alt="Profile Picture"
            />
          </div>
          <div class="mt-4">
            <p class="text-2xl font-semibold">{{ user.name }}</p>
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
            <p
              class="mt-2 tracking-wide text-white font-medium text-opacity-75"
            >
              <span class="uppercase text-sm">etb</span>
              <span class="text-2xl ml-2">{{ balance }}</span>
            </p>
          </div>
          <div class="mt-8">
            <button
              class="px-6 py-2 text-indigo-200 border border-indigo-300 hover:text-white hover:border-white rounded-full hover:text-white transition duration-300 ease-in-out"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div class="col-span-2">
        <h2 class="text-2xl font-bold text-gray-700">My Tickets</h2>
        <div class="mt-4 space-y-4">
          <template v-if="hasTickets">
            <UserTicket
              v-for="(ticket, index) in userTickets"
              :key="`user-ticket-${index}`"
              :ticket="ticket"
            />
          </template>
          <div v-else>
            <p class="text-xl text-gray-600 font-medium">
              No purchased tickets!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/mixins/auth";

import UserTicket from "@/components/UserTicket";

export default {
  mixins: [Auth],
  components: {
    UserTicket,
  },
  data: () => ({
    userTickets: [],
    loading: false,
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
    hasTickets() {
      return !!this.userTickets.length;
    },
    balance() {
      return (this.user.wallet_balance / 100).toFixed(2);
    },
  },
  created() {
    this.loading = true;

    this.$http
      .get(`/user/tickets`)
      .then(response => (this.userTickets = response.data))
      .catch(err => console.log(err))
      .finally(() => (this.loading = false));
  },
};
</script>
