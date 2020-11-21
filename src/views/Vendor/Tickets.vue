<template>
  <div class="container mx-auto">
    <div>
      <h2 class="text-2xl font-medium text-gray-700">{{ user.name }}</h2>
      <div class="mt-4 pt-4 grid grid-cols-3 gap-6 border-t">
        <div class="col-span-1">
          <Button variant="primary">New Ticket</Button>
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
                    <div class="bg-white divide-y divide-gray-200">
                      <VendorTicket
                        v-for="i in 3"
                        :key="`vendor-ticket-${i}`"
                        :ticket="i"
                      />
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
};
</script>
