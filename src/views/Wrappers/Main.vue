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
          </div>
          <div v-if="isLoggedIn" class="flex items-center space-x-8">
            <div class="relative" ref="dropdownWrapper">
              <div
                @click="toggleProfileDropdown"
                class="flex items-center font-semibold text-sm text-gray-700 hover:text-black transition duration-300 ease-in-out cursor-pointer"
              >
                <img
                  class="h-10 w-10 object-cover rounded-full"
                  :src="profilePath"
                  :alt="user.name"
                />
                <span class="ml-4">{{ user.name }}</span>
              </div>
              <div
                v-if="profileDropdownOpen"
                class="absolute origin-top-right mt-12 right-0 top-0 w-64 z-50 shadow-xl"
              >
                <div class="bg-white rounded-lg overflow-hidden">
                  <ul class="p-2" v-if="scope === 'vendor'">
                    <li>
                      <router-link
                        to="/vendor/dashboard"
                        class="block px-4 py-2 font-semibold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg"
                        >Dashboard</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        to="/vendor/tickets"
                        class="block px-4 py-2 font-semibold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg"
                        >Tickets</router-link
                      >
                    </li>
                    <li>
                      <router-link
                        to="/vendor/reports"
                        class="block px-4 py-2 font-semibold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg"
                        >Reports</router-link
                      >
                    </li>
                    <li class="border-t my-2"></li>
                    <li>
                      <button
                        @click="logout"
                        type="button"
                        to="/profile"
                        class="block w-full px-4 py-2 font-semibold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg text-left"
                      >
                        Sign out
                      </button>
                    </li>
                  </ul>
                  <ul v-else class="p-2">
                    <li v-if="isAdmin">
                      <router-link
                        to="/admin/dashboard"
                        class="block px-4 py-2 font-semibold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg"
                        >Dashboard</router-link
                      >
                    </li>
                    <li v-else>
                      <router-link
                        to="/profile"
                        class="block px-4 py-2 font-semibold text-sm text-gray-700 hover:text-black hover:bg-gray-200 transition duration-300 ease-in-out rounded-lg"
                        >Profile</router-link
                      >
                    </li>
                    <li class="border-t my-2"></li>
                    <li>
                      <button
                        @click="logout"
                        type="button"
                        to="/profile"
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
          <div v-else class="flex items-center space-x-8">
            <router-link
              to="/login"
              class="px-10 py-3 font-semibold rounded-lg text-sm text-gray-700 hover:text-black hover:bg-white transition duration-300 ease-in-out"
            >
              Login
            </router-link>
            <router-link
              to="/signup"
              class="px-10 py-3 font-semibold rounded-lg text-sm text-indigo-700 bg-indigo-200 hover:bg-indigo-300 transition duration-300 ease-in-out"
            >
              Sign Up
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <main>
      <router-view></router-view>
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
    profilePath() {
      if (this.user && this.user.profile_picture) {
        return (
          process.env.VUE_APP_BACKEND_URL +
          "storage/" +
          this.user.profile_picture
        );
      }

      if (this.user && this.user.logo_path) {
        return (
          process.env.VUE_APP_BACKEND_URL + "storage/" + this.user.logo_path
        );
      }

      return "https://www.colorbook.io/imagecreator.php?width=300&height=300&hex=&text=";
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
