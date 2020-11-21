<template>
  <div class="grid grid-cols-7">
    <div class="col-span-4 px-6 py-4 whitespace-nowrap">
      <p class="text-sm text-gray-600">{{ ticket.vendor.name }}</p>
      <p class="font-medium text-gray-900">{{ ticket.title }}</p>
      <p class="mt-4 text-sm text-gray-600">
        {{ venue }} &bull; {{ day }} ({{ diff }})
      </p>
    </div>
    <div class="col-span-1 grid place-items-center px-6 py-4 whitespace-nowrap">
      <svg
        v-if="published"
        class="text-green-500 w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        :title="publishedAt"
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
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div
      class="col-span-1 grid place-items-center px-6 py-4 whitespace-nowrap text-sm text-gray-500"
    >
      <svg
        v-if="approved"
        class="text-green-500 w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        :title="approvedAt"
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
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </div>
    <div
      class="col-span-1 grid place-items-center whitespace-nowrap text-right text-sm font-medium"
    >
      <button
        v-if="canApprove"
        @click="approve"
        type="button"
        class="relative px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-200 transition ease-in-out duration-300 overflow-hidden"
        :class="{
          'bg-gray-200 text-gray-900 cursor-wait': approving,
        }"
        :disabled="approving"
      >
        <span
          v-show="approving"
          class="absolute inset-0 inline-flex items-center justify-center bg-gray-200"
        >
          <span
            class="block h-4 w-4 border-2 rounded-full spin border-gray-800"
            style="border-bottom-color: transparent"
          ></span>
        </span>
        <span>Approve</span>
      </button>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";

export default {
  props: ["ticket"],
  data: () => ({
    dateObj: {},
    recentlyApproved: false,
    approving: false,
  }),
  created() {
    this.dateObj = DateTime.fromISO(this.ticket.date);
  },
  computed: {
    venue() {
      return `${this.ticket.venue}, ${this.ticket.city}`;
    },
    day() {
      return this.dateObj.toLocaleString(DateTime.DATE_FULL);
    },
    diff() {
      return this.dateObj.toRelative();
    },
    published() {
      return this.ticket.published_at;
    },
    approved() {
      return this.ticket.approved_at || this.recentlyApproved;
    },
    publishedAt() {
      return this.published
        ? DateTime.fromISO(this.published).toLocaleString(DateTime.DATE_FULL)
        : "";
    },
    approvedAt() {
      return this.approved
        ? DateTime.fromISO(this.approved).toLocaleString(DateTime.DATE_FULL)
        : "";
    },
    canApprove() {
      return this.publishedAt && !this.approvedAt;
    },
  },
  methods: {
    approve() {
      this.approving = true;

      this.$http
        .post(`/tickets/${this.ticket.id}/approve`)
        .then(() => (this.recentlyApproved = true))
        .catch(err => console.log(err))
        .finally(() => (this.approving = false));
    },
  },
};
</script>
