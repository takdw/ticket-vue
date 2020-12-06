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
            <button
              class="w-full px-6 py-2 text-indigo-200 border border-indigo-300 hover:text-white hover:border-white rounded-full hover:text-white focus:outline-none transition duration-300 ease-in-out"
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

    <transition
      enter-class="opacity-0"
      enter-to-class="opacity-1"
      enter-active-class="transition ease-out duration-150"
      leave-active-class="transition ease-out duration-150"
      leave-to-class="opacity-0"
      leave-class="opacity-1"
      @after-enter="show = true"
    >
      <div
        v-if="modalOpen"
        class="fixed inset-0 bg-black bg-opacity-25 grid place-items-center"
        @click="hideDepositModal"
      >
        <transition
          enter-class="transform scale-75 opacity-0"
          enter-to-class="transform scale-100 opacity-1"
          enter-active-class="transition ease-out duration-150"
          leave-active-class="transition ease-out duration-150"
          leave-to-class="transform scale-75 opacity-0"
          leave-class="transform scale-100 opacity-1"
          @after-leave="modalOpen = false"
        >
          <div
            v-if="show"
            class="max-w-lg bg-white rounded-lg shadow overflow-hidden"
            @click.stop
          >
            <div class="p-6">
              <h2 class="font-medium">Depoist Money</h2>
              <p class="mt-4 leading-tight text-gray-600">
                To add money to your wallet, please depsoit cash to the bank
                account number provided below at your nearest Commercial Bank of
                Ethiopia branch.
              </p>
              <p
                class="py-2 text-center mt-8 rounded bg-gray-200 text-gray-700 text-2xl font-display font-medium"
              >
                1000028628777
              </p>
            </div>
            <div class="bg-gray-200 text-right p-4">
              <Button @click="hideDepositModal" variant="outline"
                >Cancel</Button
              >
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script>
import Auth from "@/mixins/auth";

import Button from "@/components/Button";
import UserTicket from "@/components/UserTicket";

export default {
  mixins: [Auth],
  components: {
    Button,
    UserTicket,
  },
  data: () => ({
    userTickets: [],
    loading: false,
    modalOpen: false,
    show: false,
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
  watch: {
    modalOpen(val) {
      if (val) {
        document.body.addEventListener("keyup", this.escapeListener);
      } else {
        document.body.removeEventListener("keyup", this.escapeListener);
      }
    },
  },
  beforeDestory() {
    document.body.removeEventListener("keyup", this.escapeListener);
  },
  methods: {
    showDepositModal() {
      this.modalOpen = true;
    },
    hideDepositModal() {
      this.show = false;
    },
    escapeListener(e) {
      if (e.keyCode === 27) {
        this.hideDepositModal();
      }
    },
  },
};
</script>
