<template>
  <div class="grid grid-cols-8" :class="{ 'bg-green-100': isAdmin }">
    <div class="col-span-4 px-6 py-4 whitespace-nowrap">
      <p class="text-sm text-gray-600">{{ user.name }}</p>
      <p class="font-medium text-gray-900">{{ user.email }}</p>
    </div>
    <div
      v-if="isAdmin"
      class="col-span-1 grid place-items-center px-6 py-4 whitespace-nowrap"
    >
      <span
        class="text-green-800 bg-green-200 rounded-md px-2 py-1 text-xs font-medium uppercase tracking-wider"
        >Admin</span
      >
    </div>
    <div
      v-else
      class="col-span-1 grid place-items-center px-6 py-4 whitespace-nowrap"
    >
      <svg
        v-if="!deactivated"
        class="text-green-500 w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <svg
        v-else
        class="text-gray-500 w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        :title="deactivatedAt"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div
      class="col-span-3 flex items-center whitespace-nowrap text-right text-sm font-medium"
    >
      <div v-if="!isAdmin">
        <button
          v-if="!deactivated"
          @click="startDepositing"
          type="button"
          class="relative px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition ease-in-out duration-300 overflow-hidden"
          :class="{
            'bg-gray-200 text-gray-900 cursor-wait': depositing,
          }"
          :disabled="depositing"
        >
          <span
            v-show="depositing"
            class="absolute inset-0 inline-flex items-center justify-center bg-gray-200"
          >
            <span
              class="block h-4 w-4 border-2 rounded-full spin border-gray-800"
              style="border-bottom-color: transparent"
            ></span>
          </span>
          <span>Depoist Money</span>
        </button>
        <button
          v-if="canDeactivate"
          @click="deactivate"
          type="button"
          class="relative ml-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition ease-in-out duration-300 overflow-hidden"
          :class="{
            'bg-gray-200 text-gray-900 cursor-wait': deactivating,
          }"
          :disabled="deactivating"
        >
          <span
            v-show="deactivating"
            class="absolute inset-0 inline-flex items-center justify-center bg-gray-200"
          >
            <span
              class="block h-4 w-4 border-2 rounded-full spin border-gray-800"
              style="border-bottom-color: transparent"
            ></span>
          </span>
          <span>Deactivate</span>
        </button>
        <button
          v-else
          @click="activate"
          type="button"
          class="relative ml-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition ease-in-out duration-300 overflow-hidden"
          :class="{
            'bg-gray-200 text-gray-900 cursor-wait': activating,
          }"
          :disabled="activating"
        >
          <span
            v-show="activating"
            class="absolute inset-0 inline-flex items-center justify-center bg-gray-200"
          >
            <span
              class="block h-4 w-4 border-2 rounded-full spin border-gray-800"
              style="border-bottom-color: transparent"
            ></span>
          </span>
          <span>Activate</span>
        </button>
      </div>
    </div>
    <div
      @click="cancelDepositing"
      v-if="depositModalOpen"
      class="fixed inset-0 bg-black bg-opacity-25 z-50"
    >
      <div class="h-full grid place-items-center">
        <div
          @click.stop
          class="bg-white rounded-xl w-full max-w-lg overflow-hidden"
        >
          <form @submit.prevent="deposit">
            <h2 class="mt-8 px-8 font-medium text-xl">Deposit Money</h2>
            <div class="mt-2 px-8">
              <p class="text-gray-700">
                You are depositing money to <strong>{{ user.name }}</strong
                >.
              </p>
              <p class="text-gray-700">
                Current Balance: <small>ETB</small>{{ " " }}
                <strong>{{ balance }}</strong>
              </p>
            </div>
            <div class="mt-4 px-8">
              <label for="amount" class="font-medium">Amount to Depoist</label>
              <input
                v-model="amount"
                id="amount"
                class="form-input block w-full max-w-sm mt-1"
                placeholder="1000"
              />
            </div>
            <div class="mt-8 bg-gray-200 py-4 px-8 space-x-4">
              <Button :loading="depositing">Deposit</Button>
              <Button @click="cancelDepositing" variant="outline" type="button"
                >Cancel</Button
              >
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";

import Button from "@/components/Button";

export default {
  props: ["user"],
  components: {
    Button,
  },
  data: () => ({
    dateObj: {},
    recentlyDeactivated: false,
    recentlyActivated: false,
    deactivating: false,
    depositing: false,
    activating: false,
    depositModalOpen: false,
    amount: "",
  }),
  created() {
    this.dateObj = DateTime.fromISO(this.user.created_at);
  },
  computed: {
    deactivated() {
      return (
        (this.user.deactivated_at || this.recentlyDeactivated) &&
        !this.recentlyActivated
      );
    },
    deactivatedAt() {
      return this.deactivated
        ? DateTime.fromISO(this.deactivated).toLocaleString(DateTime.DATE_FULL)
        : "";
    },
    canDeactivate() {
      return !this.deactivated;
    },
    isAdmin() {
      return this.user.roles_list.includes("admin");
    },
    balance() {
      return (parseInt(this.user.wallet_balance) / 100).toFixed(2);
    },
  },
  methods: {
    deactivate() {
      this.deactivating = true;

      this.$http
        .post(`/users/${this.user.id}/deactivate`)
        .then(() => {
          this.recentlyDeactivated = true;
          this.recentlyActivated = false;
        })
        .catch(err => console.log(err))
        .finally(() => (this.deactivating = false));
    },
    startDepositing() {
      this.depositModalOpen = true;
    },
    cancelDepositing() {
      this.amount = "";
      this.depositModalOpen = false;
    },
    activate() {
      this.activating = true;

      this.$http
        .delete(`/users/${this.user.id}/deactivate`)
        .then(() => {
          this.recentlyDeactivated = false;
          this.recentlyActivated = true;
        })
        .catch(err => console.log(err))
        .finally(() => (this.activating = false));
    },
    deposit() {
      this.depositing = true;

      let amount = parseInt(this.amount);

      if (isNaN(amount)) {
        this.depositing = false;
        return;
      }

      this.$http
        .post(`/users/${this.user.id}/deposit`, {
          amount: amount * 100,
        })
        .then(() => {
          this.$emit("deposited");
          this.cancelDepositing();
        })
        .catch(err => console.log(err))
        .finally(() => (this.depositing = false));
    },
  },
};
</script>
