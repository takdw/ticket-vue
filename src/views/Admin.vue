<template>
  <div class="h-full bg-gray-200">
    <header>
      <div class="container mx-auto">
        <div class="flex justify-between items-center py-8">
          <div>
            <router-link
              class="text-3xl font-semibold font-semibold text-gray-700"
              to="/"
            >
              digiTickets
            </router-link>
            <span
              class="bg-white px-2 py-1 rounded-lg font-semibold text-indigo-500"
              >ADMIN</span
            >
          </div>
          <div v-if="isLoggedIn" class="flex items-center space-x-8">
            <div class="relative" ref="dropdownWrapper">
              <div
                @click="toggleProfileDropdown"
                class="flex items-center font-semibold text-sm text-gray-700 hover:text-black transition duration-300 ease-in-out cursor-pointer"
              >
                <img
                  class="h-10 w-10 object-cover rounded-full"
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=80"
                  alt="Profile Picture"
                />
                <span class="ml-4">{{ user.name }}</span>
              </div>
              <div
                v-if="profileDropdownOpen"
                class="absolute origin-top-right mt-12 right-0 top-0 w-64 z-50 shadow-xl"
              >
                <div class="bg-white rounded-lg overflow-hidden">
                  <ul class="p-2">
                    <li>
                      <router-link
                        to="/admin/dashboard"
                        class="block px-4 py-2 font-semibold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg"
                        >Dashboard</router-link
                      >
                    </li>
                    <li class="border-t my-2"></li>
                    <li>
                      <button
                        @click="logout"
                        type="button"
                        class="block w-full px-4 py-2 font-semibold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg text-left"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main>
      <div class="container mx-auto">
        <div class="grid grid-cols-3 gap-6">
          <div class="col-span-1">
            <ul class="admin-nav space-y-2 w-64">
              <li>
                <router-link
                  class="block w-full px-4 py-2 rounded text-left hover:bg-gray-400 transition duration-300 ease-in-out font-semibold"
                  to="/admin/dashboard"
                >
                  Dashboard
                </router-link>
              </li>
              <li>
                <router-link
                  class="block w-full px-4 py-2 rounded text-left hover:bg-gray-400 transition duration-300 ease-in-out font-semibold"
                  to="/admin/vendors"
                >
                  Vendors
                </router-link>
              </li>
              <li>
                <router-link
                  class="block w-full px-4 py-2 rounded text-left hover:bg-gray-400 transition duration-300 ease-in-out font-semibold"
                  to="/admin/tickets"
                >
                  Tickets
                </router-link>
              </li>
              <li>
                <router-link
                  class="block w-full px-4 py-2 rounded text-left hover:bg-gray-400 transition duration-300 ease-in-out font-semibold"
                  to="/admin/users"
                >
                  Users
                </router-link>
              </li>
              <li>
                <router-link
                  class="block w-full px-4 py-2 rounded text-left hover:bg-gray-400 transition duration-300 ease-in-out font-semibold"
                  to="/admin/settings"
                >
                  Settings
                </router-link>
              </li>
            </ul>
          </div>
          <div class="col-span-2">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </main>

    <footer>
      <div class="py-12">
        <p class="text-center font-semibold text-gray-700">
          {{ year }} &copy; DigiTickets
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import Auth from "@/mixins/auth";

export default {
  mixins: [Auth],
  data: () => ({
    profileDropdownOpen: false,
  }),
  watch: {
    profileDropdownOpen(newValue) {
      if (newValue) {
        document.body.addEventListener("click", this.bodyClickListener);
      } else {
        document.body.removeEventListener("click", this.bodyClickListener);
      }
    },
    $route() {
      this.profileDropdownOpen = false;
    },
  },
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
  methods: {
    toggleProfileDropdown() {
      this.profileDropdownOpen = !this.profileDropdownOpen;
    },
    bodyClickListener(e) {
      if (!this.$refs.dropdownWrapper.contains(e.target)) {
        this.profileDropdownOpen = false;
      }
    },
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {
          this.$router.go();
          console.log("successfuly logged out");
        })
        .catch(() => console.log("error logging out"));
    },
  },
  beforeDestroy() {
    this.profileDropdownOpen = false;
    document.body.removeEventListener("click", this.bodyClickListener);
  },
};
</script>

<style>
.admin-nav .router-link-exact-active,
.admin-nav .router-link-active {
  @apply bg-indigo-500 text-white hover:bg-indigo-400;
}
</style>
