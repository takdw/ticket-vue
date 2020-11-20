const Auth = {
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
    user() {
      return this.$store.state.user;
    },
    wallet() {
      return this.user.wallet_balance || 0;
    },
  },
};

export default Auth;
