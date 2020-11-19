<template>
  <div class="h-full grid grid-cols-3 overflow-hidden">
    <div
      class="relative col-span-1 bg-indigo-500 text-white bg-cover bg-center"
      style="
        background-image: url('https://images.unsplash.com/photo-1584664025570-4829fbec2176?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
      "
    >
      <div class="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <div class="relative h-full grid place-items-center z-20">
        <div class="text-center">
          <h2 class="text-4xl font-semibold">New Here?</h2>
          <p class="px-16 text-xl text-indigo-100">
            If you're just getting here, plase sign up below.
          </p>
          <p class="mt-6">
            <router-link
              to="/signup"
              class="text-xl border rounded-lg px-6 py-2 font-bold shadow hover:bg-white hover:shadow-lg hover:bg-opacity-25 transition ease-in-out duration-300"
            >
              Sign Up
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-span-2 grid place-items-center overflow-y-auto">
      <div class="w-full max-w-md mx-auto py-12">
        <h2 class="text-3xl text-center font-bold">Sign In</h2>
        <form class="space-y-3 mt-8">
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
          <div class="text-center">
            <button
              class="mt-4 px-12 py-2 rounded-lg text-white font-bold bg-indigo-500 hover:bg-indigo-400 transition duration-300 ease-in-out"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
