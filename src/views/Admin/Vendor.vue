<template>
  <div>
    <h2 class="text-2xl font-semibold text-gray-700">
      Vendor: {{ vendor.name }}
    </h2>
    <div class="mt-4 rounded-lg bg-white overflow-hidden">
      <div class="relative">
        <div
          v-if="loading"
          class="absolute inset-0 grid place-items-center py-12 bg-white bg-opacity-50 z-50"
        >
          <span
            class="block h-8 w-8 border-4 rounded-full spin border-gray-800"
            style="border-bottom-color: transparent"
          ></span>
        </div>
        <template v-else>
          <div class="p-4">
            <div class="grid grid-cols-5 gap-4">
              <div class="col-span-1 text-right">
                <p>Joined on</p>
              </div>
              <div class="col-span-4">
                <p>
                  <strong>{{ joinDate }}</strong>
                </p>
              </div>
              <div class="col-span-1 text-right">
                <p>Email</p>
              </div>
              <div class="col-span-4">
                <p>
                  <strong>{{ vendor.email }}</strong>
                </p>
              </div>
              <div class="col-span-1 text-right">
                <p>Phone Number</p>
              </div>
              <div class="col-span-4">
                <p>
                  <strong>{{ vendor.phone_number }}</strong>
                </p>
              </div>
              <div class="col-span-1 text-right">
                <p>Verified</p>
              </div>
              <div class="col-span-4">
                <p>
                  <svg
                    v-if="verified"
                    class="text-green-500 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    v-else
                    class="text-gray-500 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </p>
              </div>
              <div class="col-span-1 text-right">
                <p>Active</p>
              </div>
              <div class="col-span-4">
                <p>
                  <svg
                    v-if="active"
                    class="text-green-500 w-6 h-6"
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
                  <svg
                    v-else
                    class="text-gray-500 w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </p>
              </div>
              <div class="col-span-1 flex items-center justify-end">
                <p>License</p>
              </div>
              <div class="col-span-4">
                <a
                  class="flex items-center space-x-4 px-4 py-2 rounded border w-64 hover:bg-gray-200 transition duration-300 ease-out"
                  :href="licensePath"
                  target="_blank"
                >
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-medium">License</span></a
                >
              </div>
              <div class="col-span-1 flex items-center justify-end">
                <p>Logo</p>
              </div>
              <div class="col-span-4">
                <a
                  class="flex items-center space-x-4 px-4 py-2 rounded border w-64 hover:bg-gray-200 transition duration-300 ease-out"
                  :href="logoPath"
                  target="_blank"
                >
                  <svg
                    class="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <span class="font-medium">Logo</span></a
                >
              </div>
            </div>
          </div>
          <div class="bg-gray-100 p-4 space-x-4">
            <Button
              @click="deactivate"
              :loading="deactivating"
              type="button"
              variant="danger"
              v-if="active"
              >Deactivate</Button
            >
            <Button
              v-else
              @click="activate"
              :loading="activating"
              type="button"
              variant="primary"
              >Activate</Button
            >
            <Button
              @click="verify"
              :loading="verifying"
              type="button"
              variant="primary"
              v-if="!verified"
              >Verify</Button
            >
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";

import Button from "@/components/Button";

export default {
  components: {
    Button,
  },
  data: () => ({
    loading: false,
    vendor: {},
    deactivating: false,
    verifying: false,
    activating: false,
  }),
  created() {
    this.getVendor();
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    joinDate() {
      return this.vendor.created_at
        ? DateTime.fromISO(this.vendor.created_at).toLocaleString(
            DateTime.DATE_FULL
          )
        : "";
    },
    verified() {
      return !!this.vendor.verified_at;
    },
    active() {
      return !!!this.vendor.deactivated_at;
    },
    licensePath() {
      return (
        process.env.VUE_APP_BACKEND_URL + "/storage/" + this.vendor.license_path
      );
    },
    logoPath() {
      return (
        process.env.VUE_APP_BACKEND_URL + "/storage/" + this.vendor.logo_path
      );
    },
  },
  methods: {
    getVendor() {
      this.loading = true;

      this.$http
        .get(`/getVendor/${this.id}`)
        .then(({ data }) => (this.vendor = data))
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
    },
    deactivate() {
      this.deactivating = true;

      this.$http
        .post(`/vendors/${this.id}/deactivate`)
        .then(() => {
          this.getVendor();
        })
        .catch(err => console.log(err))
        .finally(() => (this.deactivating = false));
    },
    activate() {
      this.activating = true;

      this.$http
        .delete(`/vendors/${this.id}/deactivate`)
        .then(() => {
          this.getVendor();
        })
        .catch(err => console.log(err))
        .finally(() => (this.activating = false));
    },
    verify() {
      this.verifying = true;

      this.$http
        .post(`/vendors/${this.id}/verify`)
        .then(() => this.getVendor)
        .catch(err => console.log(err))
        .finally(() => (this.verifying = false));
    },
  },
};
</script>
