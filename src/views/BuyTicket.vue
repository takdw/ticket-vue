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
      <div class="w-full max-w-lg mx-auto">
        <h2 class="mt-4 text-center text-2xl font-semibold text-gray-600">
          Buy Tickets
        </h2>
        <div class="mt-4 bg-white rounded-xl shadow overflow-hidden">
          <div class="h-64">
            <img
              class="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
              alt="Ticket"
            />
          </div>
          <div class="px-8 py-4">
            <h2 class="text-2xl font-semibold leading-tight">
              Lorem ipsum dolor sit amet consectetur
            </h2>
            <p class="mt-2 text-gray-700">
              Sit amet consectetur, adipisicing elit. Laborum blanditiis,
              tenetur ab dolores nobis!
            </p>

            <div class="mt-4 flex items-center space-x-2">
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
              <p>Ghion Hotel</p>
            </div>
            <div class="flex mt-1 items-center space-x-2">
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
              <span>September 14, 2020 at 7:30 PM</span>
            </div>
          </div>
          <div class="bg-gray-200 px-8 py-4 shadow">
            <div class="flex justify-between items-end">
              <div>
                <label
                  for="quantity"
                  class="block text-sm font-semibold text-gray-600"
                  >Ticket Quantity</label
                >
                <input
                  type="number"
                  class="form-input w-48 mt-1"
                  min="1"
                  placeholder="1"
                />
              </div>
              <div class="leading-tight text-right">
                <p class="text-sm font-semibold text-gray-600">Total</p>
                <p class="ml-2 font-semibold">
                  <span class="text-sm">ETB</span>
                  <span class="ml-1 text-4xl">200</span>
                </p>
              </div>
            </div>
            <div class="mt-6 text-center">
              <button
                class="w-64 py-2 text-white font-semibold bg-indigo-500 hover:bg-indigo-400 rounded-lg transition ease-in-out duration-300"
              >
                Pay
              </button>
              <p class="mt-4 px-16 text-sm text-gray-700 leading-tight">
                You'll have
                <strong><span class="text-xs">ETB</span> 345.43</strong>
                remaining in your wallet after this purchase.
              </p>
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
