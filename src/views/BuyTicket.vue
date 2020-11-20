<template>
  <div class="w-full max-w-lg mx-auto">
    <h2 class="mt-4 text-center text-2xl font-semibold text-gray-600">
      Buy Tickets
    </h2>
    <div class="mt-4 bg-white rounded-xl shadow overflow-hidden">
      <div class="h-64">
        <img
          class="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
          alt="Ticket"
        />
      </div>
      <div class="px-8 py-4">
        <h2 class="text-2xl font-semibold leading-tight">{{ ticket.title }}</h2>
        <p class="mt-2 text-gray-700">{{ ticket.subtitle }}</p>

        <div class="mt-4 flex items-center space-x-2">
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
          <p>{{ ticket.venue }}</p>
        </div>
        <div class="flex mt-1 items-center space-x-2">
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
          <span>{{ date }} at {{ time }}</span>
        </div>
      </div>
      <div class="bg-gray-200 px-8 py-4 shadow">
        <div class="flex justify-between items-end">
          <div>
            <label
              for="quantity"
              class="block text-sm font-semibold text-gray-600"
              >Ticket Quantity</label
            >
            <input
              v-model="quantity"
              type="number"
              class="form-input w-48 mt-1"
              min="1"
              placeholder="1"
            />
          </div>
          <div class="leading-tight text-right">
            <p class="text-sm font-semibold text-gray-600">Total</p>
            <p class="ml-2 font-semibold">
              <span class="text-sm">ETB</span>
              <span class="ml-1 text-4xl">{{ total }}</span>
            </p>
          </div>
        </div>
        <div class="mt-6 text-center">
          <Button @click="pay" variant="primary" class="w-64" :loading="paying"
            >Pay</Button
          >
          <p class="mt-4 px-16 text-sm text-gray-700 leading-tight">
            You'll have
            <strong><span class="text-xs">ETB</span> {{ remaining }}</strong>
            remaining in your wallet after this purchase.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Auth from "@/mixins/auth";
import Ticket from "@/mixins/ticket";

import Button from "@/components/Button";

export default {
  mixins: [Auth, Ticket],
  components: {
    Button,
  },
  data: () => ({
    quantity: 1,
    paying: false,
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
    totalInCents() {
      return this.quantity * this.ticket.price;
    },
    total() {
      return (this.totalInCents / 100).toFixed(2);
    },
    remaining() {
      return ((this.wallet - this.totalInCents) / 100).toFixed(2);
    },
  },
  created() {
    this.$http
      .get(`tickets/${this.id}`)
      .then(response => (this.ticket = response.data))
      .catch(err => console.log(err));
  },
  methods: {
    pay() {
      this.paying = true;

      this.$http
        .post(`tickets/${this.id}/buy`, {
          quantity: this.quantity,
        })
        .then(response => {
          console.log(response.data);
          this.$router.push("/profile");
        })
        .catch(err => console.log(err))
        .finally(() => (this.paying = false));
    },
  },
};
</script>
