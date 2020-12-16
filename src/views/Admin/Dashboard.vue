<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-700">General Stats</h2>
    <div class="mt-4 grid grid-cols-3 gap-12">
      <div class="col-span-1">
        <div
          class="rounded-lg bg-white px-12 py-6 leading-tight font-semibold overflow-hidden shadow-lg"
        >
          <p class="text-gray-700">Total Vendors</p>
          <p class="text-6xl text-indigo-500">
            <span>{{ stats.vendors || 0 }}</span>
          </p>
        </div>
      </div>
      <div class="col-span-1">
        <div
          class="rounded-lg bg-white px-12 py-6 leading-tight font-semibold overflow-hidden shadow-lg"
        >
          <p class="text-gray-700">Total Tickets</p>
          <p class="text-6xl text-indigo-500">
            <span>{{ stats.tickets || 0 }}</span>
          </p>
        </div>
      </div>
      <div class="col-span-1">
        <div
          class="rounded-lg bg-white px-12 py-6 leading-tight font-semibold overflow-hidden shadow-lg"
        >
          <p class="text-gray-700">Total Users</p>
          <p class="text-6xl text-gray-800">
            <span class="text-indigo-500">{{ stats.users || 0 }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data: () => ({
    stats: {},
  }),
  created() {
    this.$http
      .get("/getStats")
      .then(({ data }) => (this.stats = data))
      .catch(err => console.log(err));
  },
  computed: {},
  methods: {},
};
</script>

<style></style>
