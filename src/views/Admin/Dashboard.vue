<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-3 gap-6">
      <div class="col-span-1">
        <ul class="space-y-2 w-64">
          <li>
            <button
              type="button"
              class="block w-full px-4 py-2 rounded text-left text-white bg-indigo-500 hover:bg-gray-700 transition duration-300 ease-in-out font-semibold"
              to="/admin/tickets"
            >
              Tickets
            </button>
          </li>
          <li>
            <button
              type="button"
              class="block w-full px-4 py-2 rounded text-left hover:bg-gray-400 transition duration-300 ease-in-out font-semibold"
              to="/admin/users"
            >
              Users
            </button>
          </li>
        </ul>
      </div>
      <div class="col-span-2">
        <TicketManagement />
      </div>
    </div>
  </div>
</template>

<script>
import TicketManagement from "@/components/Admin/TicketManagement";

export default {
  components: {
    TicketManagement,
  },
  data: () => ({}),
  created() {},
  computed: {},
  methods: {},
};
</script>

<style></style>
