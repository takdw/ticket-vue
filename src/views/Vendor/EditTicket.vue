<template>
  <div class="container mx-auto">
    <div>
      <h2 class="text-2xl font-medium text-gray-700">{{ user.name }}</h2>
      <div class="mt-8 pt-8 grid grid-cols-3 gap-12 border-t">
        <div class="col-span-1">
          <h2 class="text-xl font-semibold text-gray-700">Edit Ticket</h2>
          <p class="text-gray-700">Edit the ticket information</p>
        </div>
        <div class="col-span-2">
          <form @submit.prevent="update" class="space-y-3">
            <div>
              <label
                class="block font-semibold text-sm uppercase text-gray-600"
                for="title"
                >Title</label
              >
              <input
                v-model="ticket.title"
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
                v-model="ticket.subtitle"
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
                  v-model="ticket.date"
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
                  v-model="ticket.time"
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
                  v-model="ticket.venue"
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
                  v-model="ticket.city"
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
                v-model="ticket.price"
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
                v-model="ticket.additional_info"
              ></textarea>
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

export default {
  mixins: [Auth],
  components: {
    Button,
    VendorTicket,
  },
  data: () => ({
    loading: false,
    ticket: {},
  }),
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    this.$http
      .get(`/vendor/tickets/${this.id}`)
      .then(({ data }) => {
        if (data.published_at || data.approved_at) {
          this.$router.push("/vendor/tickets");
          return;
        }

        const ticketDate = DateTime.fromISO(data.date);
        const date = ticketDate.toFormat("d-M-yyyy");
        const time = ticketDate.toFormat("t");

        this.ticket = {
          title: data.title,
          subtitle: data.subtitle,
          date,
          time,
          venue: data.venue,
          city: data.city,
          price: data.price,
          additional_info: data.additional_info,
        };
      })
      .catch(err => console.log(err));
  },
  methods: {
    publish() {
      this.loading = true;

      this.$http
        .post(`/tickets/${this.id}/publish`)
        .then(response => {
          this.$router.push("/vendor/tickets");
        })
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
    },
    update() {
      this.loading = true;

      const date = DateTime.fromFormat(
        `${this.ticket.date} ${this.ticket.time}`,
        "d-M-yyyy t"
      ).toLocaleString(DateTime.DATETIME_MED);

      const data = {
        title: this.ticket.title,
        subtitle: this.ticket.subtitle,
        date,
        venue: this.ticket.venue,
        city: this.ticket.city,
        price: this.ticket.price,
        additional_info: this.ticket.additional_info,
      };

      this.$http
        .post(`/vendor/tickets/${this.id}/edit`, data)
        .then(response => {
          this.$router.push("/vendor/tickets");
        })
        .catch(err => console.log(err))
        .finally(() => (this.loading = false));
    },
  },
};
</script>
