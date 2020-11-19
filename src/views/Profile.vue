<template>
  <div class="min-h-screen bg-gray-200">
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
          <div class="space-x-8">
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
          </div>
        </div>
      </div>
    </header>

    <main>
      <div class="container mx-auto">
        <div class="grid grid-cols-3 gap-12">
          <div class="col-span-1">
            <div
              class="mt-2 bg-indigo-500 rounded-lg p-4 text-white text-center"
            >
              <div class="px-12">
                <img
                  class="object-cover rounded-full"
                  src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&h=500&q=80"
                  alt="Profile Picture"
                />
              </div>
              <div class="mt-4">
                <p class="text-2xl font-semibold">Lydia Asmare</p>
                <p class="mt-2 tracking-wide text-white text-opacity-75">
                  0911887766
                </p>
                <p class="tracking-wide text-white text-opacity-75">
                  lydia65@cool-mail.com
                </p>
                <p class="tracking-wide text-white text-opacity-75">Ethiopia</p>
              </div>
              <div class="mt-8">
                <button
                  class="px-6 py-2 text-indigo-200 border border-indigo-300 hover:text-white hover:border-white rounded-full hover:text-white transition duration-300 ease-in-out"
                >
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
          <div class="col-span-2">
            <h2 class="text-2xl font-bold text-gray-700">My Tickets</h2>
            <div class="mt-4 space-y-4">
              <div
                v-for="i in 4"
                class="w-full bg-white shadow rounded-lg px-8 py-4 hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
              >
                <div class="grid grid-cols-3 gap-6 justify-between">
                  <div class="col-span-1">
                    <p class="text-2xl font-semibold text-gray-700">
                      Lorem Ipsum Event
                    </p>
                    <div class="mt-2 flex items-center space-x-2">
                      <svg
                        class="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <p class="text-sm">Ghion Hotel</p>
                    </div>
                    <div class="flex items-center space-x-2">
                      <svg
                        class="w-5 h-5 text-gray-600"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span class="text-sm">September 14, 2020 at 7:30 PM</span>
                    </div>
                  </div>
                  <div class="grid flex items-center justify-end">
                    <p>
                      <svg
                        class="w-8 h-8 text-green-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </p>
                  </div>
                  <div class="col-span-1 flex items-center justify-end">
                    <div
                      class="text-3xl font-semibold text-gray-600 tracking-widest"
                    >
                      3****5
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
export default {
  computed: {
    year() {
      return new Date().getFullYear();
    },
  },
};
</script>
