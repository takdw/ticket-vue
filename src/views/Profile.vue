<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-3 gap-12">
      <div class="col-span-1">
        <div class="mt-2 bg-indigo-500 rounded-lg p-4 text-white text-center">
          <div class="px-12">
            <img
              class="object-cover rounded-full"
              :src="profilePath"
              :alt="user.name"
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
              @click="showDepositModal"
              type="button"
              class="w-full px-6 py-2 text-indigo-200 border border-indigo-300 hover:text-white hover:border-white rounded-full hover:text-white focus:outline-none transition duration-300 ease-in-out"
            >
              Deposit
            </button>
          </div>
          <div class="mt-2">
            <router-link
              to="/profile/edit"
              class="w-full block px-6 py-2 text-indigo-200 border border-indigo-300 hover:text-white hover:border-white rounded-full hover:text-white focus:outline-none transition duration-300 ease-in-out"
            >
              Edit Profile
            </router-link>
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

    <DepositModal ref="depositModal" />
  </div>
</template>

<script>
import Auth from "@/mixins/auth";

import UserTicket from "@/components/UserTicket";
import DepositModal from "@/components/modals/DepositModal";

export default {
  mixins: [Auth],
  components: {
    UserTicket,
    DepositModal,
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
    profilePath() {
      return this.user && this.user.profile_picture
        ? process.env.VUE_APP_BACKEND_URL +
            "storage/" +
            this.user.profile_picture
        : "https://www.colorbook.io/imagecreator.php?width=300&height=300&hex=&text=";
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
  methods: {
    showDepositModal() {
      this.$refs.depositModal.open();
    },
  },
};
</script>
