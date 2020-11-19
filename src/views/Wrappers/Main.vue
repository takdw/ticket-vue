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
          <div class="flex items-center space-x-8">
            <div
              class="flex items-center space-x-4 font-semibold text-sm text-gray-700 hover:text-black transition duration-300 ease-in-out cursor-pointer"
            >
              <img
                class="h-10 w-10 object-cover rounded-full"
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&h=300&q=80"
                alt="Profile Picture"
              />
              <span>Lydia Asmare</span>
            </div>
            <router-link
              to="/login"
              class="px-10 py-3 font-semibold rounded-lg text-sm text-gray-700 hover:text-black hover:bg-white transition duration-300 ease-in-out"
            >
              Login
            </router-link>
            <router-link
              to="signup"
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
export default {
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>
