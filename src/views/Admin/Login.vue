<template>
  <div class="w-full max-w-md mx-auto">
    <form class="mt-24" @submit.prevent="login">
      <h2
        class="text-center text-3xl font-semibold text-gray-600 text-sm uppercase"
      >
        Admin
      </h2>
      <div class="mt-4">
        <label
          class="block font-semibold text-sm uppercase text-gray-600"
          for="email"
          >Email</label
        >
        <input
          v-model="email"
          type="text"
          id="email"
          class="form-input w-full mt-1"
          placeholder="Email"
          required
        />
      </div>
      <div class="mt-2">
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
      <div class="text-center mt-4">
        <Button :loading="loading" variant="primary">Sign In</Button>
      </div>
    </form>
  </div>
</template>

<script>
import Button from "@/components/Button";

export default {
  components: {
    Button,
  },
  data: () => ({
    email: "",
    password: "",
    loading: false,
    error: "",
  }),
  created() {},
  computed: {},
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
          this.$router.push("/admin");
        })
        .catch(err => {
          if (err.response.data.email) {
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
