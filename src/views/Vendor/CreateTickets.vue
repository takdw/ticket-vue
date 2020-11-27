<template>
  <div class="container mx-auto">
    <div>
      <h2 class="text-2xl font-medium text-gray-700">{{ user.name }}</h2>
      <div class="mt-8 pt-8 grid grid-cols-3 gap-12 border-t">
        <div class="col-span-1">
          <h2 class="text-xl font-semibold text-gray-700">
            Create a new Ticket
          </h2>
          <p class="text-gray-700">
            Provide the necessary information for your ticket.
          </p>
        </div>
        <div class="col-span-2">
          <form @submit.prevent="create" class="space-y-3">
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="title"
                >Title</label
              >
              <input
                v-model="title"
                class="form-input w-full mt-1"
                id="title"
                placeholder=""
              />
            </div>
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="subtitle"
                >Subtitle</label
              >
              <input
                id="subtitle"
                class="form-input w-full mt-1"
                placeholder=""
                v-model="subtitle"
              />
            </div>
            <div class="flex space-x-6">
              <div class="flex-1">
                <label
                  class="block font-semibold text-sm uppercase text-gray-600"
                  for="date"
                  >Date</label
                >
                <input
                  class="form-input w-full mt-1"
                  id="date"
                  placeholder="DD-MM-YYYY"
                  v-model="date"
                />
              </div>
              <div class="flex-1">
                <label
                  class="block font-semibold text-sm uppercase text-gray-600"
                  for="time"
                  >Time</label
                >
                <input
                  class="form-input w-full mt-1"
                  id="time"
                  placeholder="HH:MM AA"
                  v-model="time"
                />
              </div>
            </div>
            <div class="flex space-x-6">
              <div class="flex-1">
                <label
                  class="block font-semibold text-sm uppercase text-gray-600"
                  for="venue"
                  >Venue</label
                >
                <input
                  class="form-input w-full mt-1"
                  id="venue"
                  placeholder=""
                  v-model="venue"
                />
              </div>
              <div class="flex-1">
                <label
                  class="block font-semibold text-sm uppercase text-gray-600"
                  for="city"
                  >City</label
                >
                <input
                  class="form-input w-full mt-1"
                  id="city"
                  placeholder=""
                  v-model="city"
                />
              </div>
            </div>
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="price"
                >Price</label
              >
              <input
                class="form-input w-full mt-1"
                id="price"
                placeholder=""
                v-model="price"
              />
            </div>
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="additional_info"
              >
                Additional Information
              </label>
              <textarea
                class="form-input w-full mt-1"
                id="additional_info"
                row="6"
                v-model="additional_info"
              ></textarea>
            </div>
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="additional_info"
              >
                Poster
              </label>
              <PhotoUploadInput
                :data="{ id: 'license', existing: '' }"
                v-model="poster"
              />
            </div>
            <div class="text-center">
              <Button :loading="loading">Save</Button>
              <Button
                @click="publish"
                type="button"
                :loading="loading"
                variant="primary"
                class="ml-4"
                >Publish</Button
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
      <div></div>
    </div>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import Auth from "@/mixins/auth";

import Button from "@/components/Button";
import VendorTicket from "@/components/VendorTicket";
import PhotoUploadInput from "@/components/PhotoUploadInput";

export default {
  mixins: [Auth],
  components: {
    Button,
    VendorTicket,
    PhotoUploadInput,
  },
  data: () => ({
    loading: false,
    title: "Bira Biro",
    subtitle: "An event to celebrate EDM",
    date: "28-11-2020",
    time: "7:00 PM",
    venue: "Ghion Hotel",
    city: "Addis Ababa",
    price: 30000,
    additional_info: "Gates open at 12:30PM",
    poster: "",
  }),
  computed: {},
  methods: {
    publish() {
      this.create(true);
    },
    create(publish = false) {
      this.loading = true;

      const date = DateTime.fromFormat(
        `${this.date} ${this.time}`,
        "d-M-yyyy t"
      ).toLocaleString(DateTime.DATETIME_MED);

      const fd = new FormData();
      fd.append("title", this.title);
      fd.append("subtitle", this.subtitle);
      fd.append("date", date);
      fd.append("venue", this.venue);
      fd.append("city", this.city);
      fd.append("price", this.price);
      fd.append("additional_info", this.additional_info);
      fd.append("poster", this.poster);
      fd.append("publish", publish);

      this.$http
        .post(`/vendors/${this.user.id}/tickets`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(response => {
          this.$router.push("/vendor/tickets");
        })
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
    },
  },
};
</script>
