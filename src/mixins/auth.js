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
    scope() {
      return this.$store.state.scope;
    },
  },
};

export default Auth;
