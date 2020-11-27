<template>
  <div class="container mx-auto">
    <div>
      <h2 class="text-2xl font-medium text-gray-700">{{ user.name }}</h2>
      <div class="mt-8 pt-8 grid grid-cols-3 gap-12 border-t">
        <div class="col-span-1">
          <h2 class="text-xl font-semibold text-gray-700">
            Edit your information
          </h2>
          <p class="text-gray-700 text-sm mt-2">
            You can edit some of your information here. Some fields can not be
            edited. You have to contact the adminstrator if you want to make
            changes to those fields.
          </p>
        </div>
        <div class="col-span-2 grid grid-cols-4">
          <form @submit.prevent="create" class="space-y-3 col-span-3">
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="tin"
                >TIN</label
              >
              <input
                v-model="tin"
                class="form-input w-full mt-1 bg-gray-200 border-gray-300"
                id="tin"
                placeholder=""
                disabled
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
                :data="{ id: 'license', existing: existingLicense }"
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
                :data="{ id: 'logo', existing: existingLogo }"
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
                :data="{ id: 'image', existing: existingImage }"
                v-model="image"
              />
            </div>
            <div class="text-center">
              <Button
                @click="update"
                type="button"
                :loading="upadting"
                variant="primary"
                class="ml-4"
                >Update</Button
              >
              <Button
                @click="$router.go(-1)"
                type="button"
                variant="outline"
                class="ml-4"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
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
    upadting: false,
    tin: "",
    name: "",
    email: "",
    phone_number: "",
    license: {},
    logo: {},
    image: {},
    existingLicense: "",
    existingLogo: "",
    existingImage: "",
  }),
  created() {
    this.tin = this.user.tin;
    this.name = this.user.name;
    this.existingLicense = this.user.license_path;
    this.existingLogo = this.user.logo_path;
    this.existingImage = this.user.image_path;
  },
  computed: {},
  methods: {
    update() {
      this.upadting = true;

      const fd = new FormData();
      if (this.name) fd.append("name", this.name);
      if (this.license.size) fd.append("license", this.license);
      if (this.logo.size) fd.append("logo", this.logo);
      if (this.image.size) fd.append("image", this.image);

      this.$http
        .post("/vendor/edit", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(response => console.log(response.data))
        .catch(err => console.log(err))
        .finally(() => (this.upadting = false));
    },
  },
};
</script>
