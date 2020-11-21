<template>
  <div class="container mx-auto">
    <div>
      <h2 class="text-2xl font-medium text-gray-700">{{ user.name }}</h2>
      <div class="mt-4 pt-4 grid grid-cols-3 gap-6 border-t">
        <div class="col-span-1">
          <Button
            variant="primary"
            @click="$router.push('/vendor/tickets/new')"
            type="button"
          >
            New Ticket
          </Button>
        </div>
        <div class="col-span-2">
          <h2 class="py-2 text-xl font-medium text-gray-700">Tickets</h2>
          <div class="flex flex-col">
            <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div
                class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
              >
                <div
                  class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
                >
                  <div class="min-w-full divide-y divide-gray-200">
                    <div>
                      <div class="bg-white grid grid-cols-7">
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
                    <div
                      class="relative bg-white"
                      :class="{ 'py-24': loading }"
                    >
                      <div
                        v-if="loading"
                        class="absolute inset-0 grid place-items-center py-6 bg-white bg-opacity-50 z-50"
                      >
                        <span
                          class="block h-8 w-8 border-4 rounded-full spin border-gray-800"
                          style="border-bottom-color: transparent"
                        ></span>
                      </div>
                      <div class="divide-y divide-gray-200">
                        <VendorTicket
                          v-for="ticket in tickets"
                          :key="`vendor-ticket-${ticket.id}`"
                          :ticket="ticket"
                        />
                      </div>
                    </div>
                    <div v-if="hasPages" class="bg-white flex p-4">
                      <pagination
                        :data="paginator"
                        @pagination-change-page="getTickets"
                        :limit="3"
                      ></pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import Auth from "@/mixins/auth";

import Button from "@/components/Button";
import VendorTicket from "@/components/VendorTicket";

export default {
  mixins: [Auth],
  components: {
    Button,
    VendorTicket,
  },
  data: () => ({
    loading: true,
    paginator: {
      data: [],
    },
  }),
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
    this.loading = true;

    this.$http
      .get("/vendor/tickets")
      .then(response => (this.paginator = response.data))
      .catch(err => console.log(err))
      .finally(() => (this.loading = false));
  },
  methods: {
    getTickets() {},
  },
};
</script>
