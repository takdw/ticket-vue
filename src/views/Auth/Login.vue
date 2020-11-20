<template>
  <div class="h-screen grid grid-cols-3 overflow-hidden">
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
    <div class="row-start-1 col-span-2 grid place-items-center overflow-y-auto">
      <div class="w-full max-w-md mx-auto py-12">
        <h2 class="text-3xl text-center font-bold">Sign In</h2>
        <div v-if="error" class="mt-4">
          <p
            class="text-red-800 bg-red-200 border border-red-800 text-center p-4 rounded-lg"
          >
            Incorrect email/password combination.
          </p>
        </div>
        <form @submit.prevent="login" class="space-y-3 mt-4">
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="email"
              >Email/TIN</label
            >
            <input
              v-model="email"
              type="text"
              id="email"
              class="form-input w-full mt-1"
              placeholder="Email or Vendor TIN"
              required
            />
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="password"
              >Password</label
            >
            <input
              v-model="password"
              class="form-input w-full mt-1"
              id="password"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div class="text-center">
            <Button :loading="loading" variant="primary">Sign In</Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
export default {
  components: {
    Button,
  },
  data: () => ({
    loading: false,
    email: "",
    password: "",
    error: false,
  }),
  methods: {
    login() {
      this.error = false;
      this.loading = true;

      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(response => {
          setTimeout(() => this.$router.push("/"), 150);
        })
        .catch(err => {
          if (err.response.data.email || err.response.data.tin) {
            this.error = true;
          } else {
            // show an error message or something
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>
