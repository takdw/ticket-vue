<template>
  <div>
    <h2 class="text-2xl font-semibold text-gray-700">Tickets</h2>
    <div class="mt-4 grid grid-cols-3 gap-6">
      <div class="col-span-1">
        <select
          @change="setStatusFilter"
          class="w-full form-select"
          name="type"
          id="type"
        >
          <option value="">All</option>
          <option
            v-for="option in options"
            :key="`status-option-${option.value}`"
            :value="option.value"
            :selected="option.value === statusFilter"
          >
            {{ option.label }}
          </option>
        </select>
      </div>
    </div>
    <div class="mt-4 rounded-lg bg-white divide-y">
      <div>
        <div class="grid grid-cols-7">
          <div
            scope="col"
            class="col-span-4 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Name
          </div>
          <div
            class="col-span-1 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Published
          </div>
          <div
            class="col-span-1 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            Approved
          </div>
          <div class="col-span-1 px-6 py-3 bg-gray-50">
            <span class="sr-only">Edit</span>
          </div>
        </div>
      </div>
      <div class="relative">
        <div
          v-if="loading"
          class="absolute inset-0 grid place-items-center py-12 bg-white bg-opacity-50 z-50"
        >
          <span
            class="block h-8 w-8 border-4 rounded-full spin border-gray-800"
            style="border-bottom-color: transparent"
          ></span>
        </div>
        <div
          v-if="!hasTickets"
          class="grid place-items-center py-12 bg-white bg-opacity-50 z-50"
        >
          <p class="text-gray-600 font-semibold">There are no tickets!</p>
        </div>
        <div v-else class="divide-y divide-gray-200">
          <AdminTicket
            v-for="ticket in tickets"
            :key="`admin-ticket-${ticket.id}`"
            :ticket="ticket"
          />
        </div>
      </div>
      <div v-if="hasPages" class="flex px-6 py-4">
        <pagination
          :data="paginator"
          @pagination-change-page="getTickets"
          :limit="3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdminTicket from "@/components/Admin/AdminTicket";

export default {
  components: {
    AdminTicket,
  },
  data: () => ({
    paginator: {
      data: [],
    },
    options: [
      { value: "published", label: "Published" },
      { value: "approved", label: "Approved" },
      { value: "unpublished", label: "Unpublished" },
      { value: "unapproved", label: "Unapproved" },
    ],
    loading: false,
    statusFilter: "",
  }),
  created() {
    this.getTickets();
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
  methods: {
    getTickets(page = 1) {
      this.loading = true;

      const params = [];

      if (page !== 1) params.push(`page=${page}`);
      if (this.statusFilter) params.push(`status=${this.statusFilter}`);

      this.$http
        .get("/getTickets?" + params.join("&"))
        .then(response => (this.paginator = response.data))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
    },
    setStatusFilter(e) {
      this.statusFilter = e.target.value;

      this.getTickets();
    },
  },
};
</script>
