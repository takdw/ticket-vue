<template>
  <div>
    <div class="container mx-auto">
      <div
        class="relative -mx-12 rounded-xl overflow-hidden"
        style="height: 550px"
      >
        <div class="absolute inset-0 bg-black bg-opacity-50">
          <div class="h-full grid grid-cols-2 gap-12">
            <div class="col-span-1 h-full flex items-center">
              <div class="px-12">
                <h2 class="text-5xl font-semibold text-white leading-tight">
                  {{ ticket.title }}
                </h2>
                <p class="mt-8 text-xl text-white">{{ ticket.subtitle }}</p>
                <div class="mt-8 flex items-center text-white">
                  <div>
                    <svg
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p class="ml-2">{{ ticket.venue }}</p>
                </div>
              </div>
            </div>
            <div class="col-span-1 h-full flex items-center justify-end">
              <div class="pr-24 pl-32 w-full">
                <div class="bg-white rounded-lg p-6">
                  <p>
                    <span class="text-xl font-semibold">
                      {{ dayName }} {{ date }}
                    </span>
                    <br />
                    <span class="font-semibold text-gray-600"
                      >at <span class="text-indigo-500">{{ time }}</span></span
                    >
                  </p>
                  <router-link
                    to="/ticket/1/buy"
                    class="mt-8 flex items-stretch justify-between rounded-lg bg-indigo-500 text-white cursor-pointer transition ease-in-out duration-300 hover:bg-indigo-400"
                  >
                    <p class="text-xl font-semibold p-4">Buy Tickets</p>
                    <p
                      class="my-2 mr-2 px-4 font-semibold rounded-md bg-white text-indigo-500 flex items-center"
                    >
                      <span>
                        <span class="text-sm">ETB</span>
                        <span class="ml-1 text-xl">{{ price }}</span>
                      </span>
                    </p>
                  </router-link>
                  <p class="mt-4 text-center text-sm font-medium text-gray-600">
                    {{ ticket.additional_info }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <img
          class="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
          alt="Ticket"
        />
      </div>
    </div>
    <div class="mt-12"></div>
    <div class="w-full max-w-4xl mx-auto">
      <div class="grid grid-cols-5 gap-24">
        <div class="col-span-3">
          <div>
            <h2 class="text-2xl font-bold text-gray-700">Description</h2>
            <p class="mt-4">{{ ticket.subtitle }}</p>
          </div>
          <div class="mt-12">
            <h2 class="text-2xl font-bold text-gray-700">Date and Time</h2>
            <p class="mt-4 flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>{{ date }}</span>
            </p>
            <p class="mt-2 flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>{{ time }}</span>
            </p>
          </div>
          <div class="mt-12">
            <h2 class="text-2xl font-bold text-gray-700">Contact</h2>
            <p class="mt-4 flex items-center space-x-2">
              <svg
                class="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span>{{ vendor.email }}</span>
            </p>
            <p class="mt-2 flex items-center space-x-2">
              <svg
                class="w-6 h-6 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"
                ></path>
              </svg>
              <span>{{ vendor.phone_number }}</span>
            </p>
          </div>
        </div>
        <div class="col-span-2">
          <div>
            <h2 class="text-2xl font-bold text-gray-700">Location and Venue</h2>
            <div class="mt-4 rounded-lg overflow-hidden shadow">
              <img
                class="w-full"
                src="http://babi.test/map.png"
                alt="Event Location"
              />
            </div>
            <div class="mt-4 flex space-x-2">
              <svg
                class="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p>
                <span>{{ ticket.venue }}</span
                >,
                <span class="text-gray-700 text-sm">{{ ticket.city }}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Ticket from "@/mixins/ticket";

export default {
  mixins: [Ticket],
  computed: {
    id() {
      return this.$route.params.id;
    },
  },
  created() {
    this.$http
      .get(`tickets/${this.id}`)
      .then(response => (this.ticket = response.data))
      .catch(err => console.log(err));
  },
};
</script>
