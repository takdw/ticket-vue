<template>
  <div class="w-full max-w-xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-700">Edit Profile</h2>
    <div class="mt-4">
      <form @submit.prevent="update" class="space-y-3">
        <!-- <div class="px-24">
          <img
            class="object-cover rounded-full"
            src="https://avatars3.githubusercontent.com/u/17249078?s=460&v=4"
            alt="Profile Picture"
          />
        </div> -->
        <div>
          <label
            class="block font-semibold text-xs uppercase text-gray-600"
            for="name"
            >Name</label
          >
          <input
            v-model="name"
            class="form-input text-sm w-full mt-1"
            id="name"
            placeholder="Abebe Balcha"
          />
        </div>
        <div>
          <label
            class="block font-semibold text-xs uppercase text-gray-600"
            for="email"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="form-input text-sm w-full mt-1"
            placeholder="abebe.balcha@gmail.com"
          />
        </div>
        <div>
          <label
            class="block font-semibold text-xs uppercase text-gray-600"
            for="phone_number"
            >Phone Number</label
          >
          <input
            v-model="phone_number"
            class="form-input text-sm w-full mt-1"
            id="phone_number"
            placeholder="0911223344"
          />
        </div>
        <div>
          <label
            class="block font-semibold text-xs uppercase text-gray-600"
            for="country"
            >Country</label
          >
          <select
            @change="setCountry"
            class="form-select text-sm w-full mt-1"
            id="country"
          >
            <option>Choose a country...</option>
            <option selected value="eth">Ethiopia</option>
          </select>
        </div>
        <!-- <div>
          <label
            class="block font-semibold text-xs uppercase text-gray-600"
            for="password"
            >Password</label
          >
          <input
            class="form-input text-sm w-full mt-1"
            id="password"
            type="password"
            placeholder="Password"
          />
        </div>
        <div>
          <label
            class="block font-semibold text-xs uppercase text-gray-600"
            for="password_confirmation"
          >
            Confirm Password
          </label>
          <input
            class="form-input text-sm w-full mt-1"
            id="password_confirmation"
            type="password"
            placeholder="Confirm Password"
          />
        </div> -->
        <div class="text-center">
          <button
            class="mt-4 px-12 py-2 rounded-lg text-white font-medium transition duration-300 ease-in-out"
            :class="{
              'bg-indigo-300 cursor-wait': updating,
              'bg-indigo-500 hover:bg-indigo-400': !updating,
            }"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "",
    email: "",
    phone_number: "",
    country: "",
    password: "",
    password_confirmation: "",
    updating: false,
  }),
  created() {
    this.name = this.user.name;
    this.email = this.user.email;
    this.phone_number = this.user.phone_number;
    this.country = this.user.country;
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
  },
  methods: {
    setCountry(e) {
      if (!e.target.value) {
        return;
      }

      this.country = e.target.value;
    },
    update() {
      this.$http
        .patch("/user", {
          name: this.name,
          email: this.email,
          phone_number: this.phone_number,
          country: this.country,
        })
        .then(() => this.$store.dispatch("check"))
        .then(() => this.$router.push("/profile"))
        .catch(err => console.log(err))
        .finally(() => (this.updating = false));
    },
  },
};
</script>
