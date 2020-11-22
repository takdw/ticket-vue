<template>
  <div class="h-screen grid grid-cols-3 overflow-hidden">
    <div
      class="relative col-span-1 bg-indigo-500 text-white bg-cover bg-center"
      style="
        background-image: url('https://images.unsplash.com/photo-1576747249421-0c693525b538?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80');
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
      <div class="w-full max-w-lg mx-auto py-12">
        <h2 class="text-3xl text-center font-bold text-gray-700">
          Register as a Vendor
        </h2>
        <form @submit.prevent="create" class="mt-4 space-y-3 col-span-3">
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="tin"
              >TIN</label
            >
            <input
              v-model="tin"
              class="form-input w-full mt-1"
              id="tin"
              placeholder=""
            />
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="name"
              >Name</label
            >
            <input
              id="name"
              class="form-input w-full mt-1"
              placeholder=""
              v-model="name"
            />
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="email"
              >Email</label
            >
            <input
              id="email"
              class="form-input w-full mt-1"
              placeholder=""
              v-model="email"
            />
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="phone_number"
              >Phone Number</label
            >
            <input
              id="phone_number"
              class="form-input w-full mt-1"
              placeholder=""
              v-model="phone_number"
            />
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="license"
              >License</label
            >
            <PhotoUploadInput
              :data="{ id: 'license', existing: {} }"
              v-model="license"
            />
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="logo"
              >Logo</label
            >
            <PhotoUploadInput
              :data="{ id: 'logo', existing: {} }"
              v-model="logo"
            />
          </div>
          <div>
            <label
              class="block font-semibold text-sm uppercase text-gray-600"
              for="image"
              >Image</label
            >
            <PhotoUploadInput
              :data="{ id: 'image', existing: {} }"
              v-model="image"
            />
          </div>
          <div class="text-center">
            <Button
              @click="create"
              type="button"
              :loading="creating"
              variant="primary"
              class="ml-4"
              >Register</Button
            >
            <!-- <Button
              @click="$router.go(-1)"
              type="button"
              variant="outline"
              class="ml-4"
            >
              Cancel
            </Button> -->
          </div>
          <div class="text-center">
            <p class="mt-4 text-sm text-gray-600">
              By clicking on register, you are agreeing to our
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

<script>
import { DateTime } from "luxon";
import Auth from "@/mixins/auth";

import Button from "@/components/Button";
import PhotoUploadInput from "@/components/PhotoUploadInput";

export default {
  mixins: [Auth],
  components: {
    Button,
    PhotoUploadInput,
  },
  data: () => ({
    creating: false,
    tin: "",
    name: "",
    email: "",
    phone_number: "",
    license: {},
    logo: {},
    image: {},
  }),
  created() {},
  computed: {},
  methods: {
    create() {
      this.creating = true;

      const fd = new FormData();
      if (this.name) fd.append("name", this.name);
      if (this.license.size) fd.append("license", this.license);
      if (this.logo.size) fd.append("logo", this.logo);
      if (this.image.size) fd.append("image", this.image);

      this.$http
        .post("/vendors", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
        .finally(() => (this.creating = false));
    },
  },
};
</script>
