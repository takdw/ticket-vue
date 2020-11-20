const Auth = {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.state.user;
    },
  },
};

export default Auth;
