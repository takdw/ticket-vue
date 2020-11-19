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
                src="https://avatars3.githubusercontent.com/u/17249078?s=460&v=4"
                alt="Profile Picture"
              />
              <span>Lydia Asmare</span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <main>
      <div class="w-full max-w-xl mx-auto">
        <h2 class="text-2xl font-bold text-gray-700">Edit Profile</h2>
        <div class="mt-4">
          <form class="space-y-3">
            <div class="px-24">
              <img
                class="object-cover rounded-full"
                src="https://avatars3.githubusercontent.com/u/17249078?s=460&v=4"
                alt="Profile Picture"
              />
            </div>
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="name"
                >Name</label
              >
              <input
                class="form-input w-full mt-1"
                id="name"
                placeholder="Abebe Balcha"
              />
            </div>
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="email"
                >Email</label
              >
              <input
                type="email"
                id="email"
                class="form-input w-full mt-1"
                placeholder="abebe.balcha@gmail.com"
              />
            </div>
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="phone_number"
                >Phone Number</label
              >
              <input
                class="form-input w-full mt-1"
                id="phone_number"
                placeholder="0911223344"
              />
            </div>
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="country"
                >Country</label
              >
              <select class="form-select w-full mt-1" id="country">
                <option>Choose a country...</option>
              </select>
            </div>
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="password"
                >Password</label
              >
              <input
                class="form-input w-full mt-1"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="password_confirmation"
              >
                Confirm Password
              </label>
              <input
                class="form-input w-full mt-1"
                id="password_confirmation"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
            <div class="text-center">
              <button
                class="mt-4 px-12 py-2 rounded-lg text-white font-bold bg-indigo-500 hover:bg-indigo-400 transition duration-300 ease-in-out"
              >
                Update
              </button>
            </div>
          </form>
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
