<template>
  <div>
    <h2 class="text-2xl font-semibold text-gray-700">Users</h2>
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
    <div class="mt-4 rounded-lg bg-white divide-y overflow-hidden">
      <div>
        <div class="grid grid-cols-8">
          <div
            scope="col"
            class="col-span-4 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            <span>Name</span>
          </div>
          <div
            class="col-span-1 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
          >
            <span>Active</span>
          </div>
          <div class="col-span-3 px-6 py-3 bg-gray-50">
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
          v-if="!hasUsers"
          class="grid place-items-center py-12 bg-white bg-opacity-50 z-50"
        >
          <p class="text-gray-600 font-semibold">
            There are no {{ statusFilter + " " || "" }}users!
          </p>
        </div>
        <div v-else class="divide-y divide-gray-200">
          <AdminUser
            v-for="user in users"
            :key="`admin-user-${user.id}`"
            :user="user"
            @deposited="refreshUser(user)"
          />
        </div>
      </div>
      <div v-if="hasPages" class="flex px-6 py-4">
        <pagination
          :data="paginator"
          @pagination-change-page="changePage"
          :limit="3"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AdminUser from "@/components/Admin/AdminUser";

export default {
  components: {
    AdminUser,
  },
  data: () => ({
    options: [
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" },
    ],
    loading: false,
    statusFilter: "",
    paginator: {
      data: [],
    },
    currentPage: 1,
  }),
  created() {
    this.getUsers();
  },
  computed: {
    users() {
      return this.paginator.data;
    },
    hasUsers() {
      return !!this.users.length;
    },
    hasPages() {
      return this.paginator.last_page > 1;
    },
  },
  methods: {
    setStatusFilter(e) {
      this.statusFilter = e.target.value;

      this.getUsers();
    },
    changePage(page = 1) {
      this.currentPage = page;
      this.getUsers();
    },
    getUsers() {
      this.loading = true;

      const params = [];

      if (this.currentPage !== 1) params.push(`page=${this.currentPage}`);
      if (this.statusFilter) params.push(`status=${this.statusFilter}`);

      this.$http
        .get(`/getUsers?` + params.join("&"))
        .then(({ data }) => (this.paginator = data))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
    },
    refreshUser(user) {
      this.getUsers();
    },
  },
};
</script>

<style></style>
