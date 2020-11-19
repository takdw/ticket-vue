<template>
  <div class="h-screen grid grid-cols-3 overflow-hidden">
    <div
      class="relative col-span-1 bg-indigo-500 text-white bg-cover bg-center"
      style="
        background-image: url('https://images.unsplash.com/photo-1565035010268-a3816f98589a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80');
      "
    >
      <div class="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <div class="relative h-full grid place-items-center z-20">
        <div class="text-center">
          <h2 class="text-4xl font-semibold">Welcome back!</h2>
          <p class="px-16 text-xl text-indigo-100">
            If you're a returning customer, plase sign in below.
          </p>
          <p class="mt-6">
            <router-link
              to="/login"
              class="text-xl border rounded-lg px-6 py-2 font-bold shadow hover:bg-white hover:shadow-lg hover:bg-opacity-25 transition ease-in-out duration-300"
            >
              Sign In
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <div class="col-span-2 grid place-items-center overflow-y-auto">
      <div class="w-full max-w-md mx-auto py-12">
        <h2 class="text-3xl text-center font-bold">Create Account</h2>
        <form class="space-y-3 mt-8">
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
              Sign Up
            </button>
            <p class="mt-4 text-sm text-gray-600">
              By clicking on sign up, you are agreeing to our
              <strong class="cursor-pointer hover:underline"
                >Terms and Conditons</strong
              >
              and
              <strong class="cursor-pointer hover:underline"
                >Privacy Policy</strong
              >.
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
