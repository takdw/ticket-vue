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
        <form @submit.prevent="signup" class="space-y-3 mt-8">
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="name"
              >Name</label
            >
            <input
              v-model="name"
              class="form-input w-full mt-1"
              :class="{ 'border-red-500': errors.name }"
              id="name"
              placeholder="Abebe Balcha"
            />
            <p class="text-red-500 text-sm font-medium" v-if="errors.name">
              {{ errors.name[0] }}
            </p>
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="email"
              >Email</label
            >
            <input
              v-model="email"
              type="email"
              id="email"
              class="form-input w-full mt-1"
              :class="{ 'border-red-500': errors.email }"
              placeholder="abebe.balcha@gmail.com"
              @keyup="clearErrors('email')"
            />
            <p class="text-red-500 text-sm font-medium" v-if="errors.email">
              {{ errors.email[0] }}
            </p>
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="phone_number"
              >Phone Number</label
            >
            <input
              v-model="phone_number"
              class="form-input w-full mt-1"
              :class="{ 'border-red-500': errors.phone_number }"
              id="phone_number"
              placeholder="0911223344"
            />
            <p
              class="text-red-500 text-sm font-medium"
              v-if="errors.phone_number"
            >
              {{ errors.phone_number[0] }}
            </p>
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              :class="{ 'border-red-500': errors.country }"
              for="country"
              >Country</label
            >
            <select
              @change="selectCountry"
              class="form-select w-full mt-1"
              id="country"
            >
              <option>Choose a country...</option>
              <option value="Ethiopia">Ethiopia</option>
            </select>

            <p class="text-red-500 text-sm font-medium" v-if="errors.country">
              {{ errors.country[0] }}
            </p>
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
              :class="{ 'border-red-500': errors.password }"
              id="password"
              type="password"
              placeholder="Password"
              @keyup="clearErrors('password')"
            />
            <p class="text-red-500 text-sm font-medium" v-if="errors.password">
              {{ errors.password[0] }}
            </p>
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="password_confirmation"
            >
              Confirm Password
            </label>
            <input
              v-model="password_confirmation"
              class="form-input w-full mt-1"
              id="password_confirmation"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="image"
              >Profile Picture</label
            >
            <PhotoUploadInput
              :data="{ id: 'profile', existing: {} }"
              v-model="profile_picture"
            />
          </div>
          <div class="text-center">
            <Button variant="primary" class="mt-4 w-64" :loading="working">
              Sign Up
            </Button>
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
          <div class="mt-4 pt-4 text-center border-t border-gray-600">
            <p class="text-sm text-gray-600">
              Are you a vendor? Register
              <router-link
                class="text-gray-600 font-semibold hover:underline"
                to="/vendor/signup"
                >here</router-link
              >.
            </p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "@/components/Button";
import PhotoUploadInput from "@/components/PhotoUploadInput";

export default {
  components: {
    Button,
    PhotoUploadInput,
  },
  data: () => ({
    working: false,
    name: "",
    email: "",
    phone_number: "",
    country: "",
    password: "",
    password_confirmation: "",
    profile_picture: "",
    errors: {},
  }),
  methods: {
    clearErrors(field) {
      if (this.errors[field]) {
        delete this.errors[field];
      }
    },
    selectCountry(e) {
      this.country = e.target.value;
    },
    signup() {
      this.working = true;

      const fd = new FormData();
      fd.append("name", this.name);
      fd.append("email", this.email);
      fd.append("phone_number", this.phone_number);
      fd.append("country", this.country);
      fd.append("password", this.password);
      fd.append("password_confirmation", this.password_confirmation);
      if (this.profile_picture)
        fd.append("profile_picture", this.profile_picture);

      this.$http
        .post("/users", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => this.$router.push("/login"))
        .catch(err => {
          this.errors = err.response.data.errors;
        })
        .finally(() => (this.working = false));
    },
  },
};
</script>
