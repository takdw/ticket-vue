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
      <div class="container mx-auto">
        <div
          class="-mx-12 bg-cover bg-center rounded-xl"
          style="
            height: 550px;
            background-image: url('https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80');
          "
        ></div>
      </div>
      <!-- <div class="container mx-auto -mt-12 px-24">
        <div class="bg-indigo-500 rounded-lg p-6 shadow-xl">
          <input
            class="form-input w-full text-xl py-4 rounded-lg"
            placeholder="Search for events..."
          />
        </div>
      </div> -->
      <div class="mt-12"></div>
      <div class="container mx-auto">
        <h2 class="text-2xl font-bold text-gray-700">Upcoming Events</h2>
        <div class="grid grid-cols-3 gap-12 py-6">
          <div v-for="i in 9" :key="`event-grid-${i}`">
            <div
              class="relative bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition ease-in-out duration-300 cursor-pointer"
            >
              <div class="absolute top-0 left-0">
                <div
                  class="ml-4 mt-4 bg-white bg-opacity-25 px-2 py-1 rounded-lg"
                >
                  <p class="font-semibold">
                    <span class="uppercase text-sm text-gray-200">etb</span>
                    <span class="ml-1 text-xl text-white">200</span>
                  </p>
                </div>
              </div>
              <div class="h-56 overflow-hidden">
                <img
                  class="w-full object-fit"
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
                  alt="Event Poster"
                />
              </div>
              <div class="flex p-6 space-x-6">
                <div class="">
                  <p class="text-center leading-tight">
                    <span class="text-indigo-500 font-semibold uppercase">
                      Sep
                    </span>
                    <br />
                    <span class="text-4xl font-semibold">16</span>
                  </p>
                </div>
                <div>
                  <h2 class="text-xl font-semibold">
                    Lorem ipsum dolor sit amet
                  </h2>
                  <p class="mt-2 leading-tight text-gray-700">
                    Soluta quo necessitatibus recusandae sapiente consequuntur.
                    Laboriosam at officia, explicabo tempore.
                  </p>
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
