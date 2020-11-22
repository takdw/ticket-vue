import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    auth: false,
    token: "",
    user: {},
    scope: "",
  },
  mutations: {
    setAuth: (state, auth) => (state.auth = auth),
    setToken: (state, token) => {
      state.token = token;
      window.localStorage.setItem("token", token);
    },
    setUser: (state, user) => (state.user = user),
    setScope: (state, scope) => {
      state.scope = scope;
      window.localStorage.setItem("scope", scope);
    },
  },
  getters: {
    isLoggedIn: state => state.auth,
    isAdmin: state => {
      const rolesList = state.user.roles_list;
      if (rolesList && rolesList.includes("admin")) return true;
      return false;
    },
  },
  actions: {
    check: ({ commit, state }) => {
      console.log("checking auth state...");
      if (!state.token) {
        console.log("no token set!");
        return Promise.resolve();
      }

      return new Promise((resolve, reject) => {
        axios
          .get(process.env.VUE_APP_API_BASE_URL + state.scope, {
            headers: {
              authorization: "Bearer " + state.token,
            },
          })
          .then(response => {
            console.log("token valid...");
            commit("setAuth", true);
            commit("setUser", response.data);
            resolve();
          })
          .catch(() => {
            console.log("token invalid...");
            commit("setAuth", false);
            commit("setUser", {});
            commit("setToken", "");
            commit("setScope", "");
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("scope");
            reject();
          });
      });
    },
    login: ({ commit, state }, data) => {
      let tin = false;

      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          data.email
        )
      ) {
        tin = true;
      }

      const url = tin ? "vendors/login" : "login";

      return new Promise((resolve, reject) => {
        axios
          .post(process.env.VUE_APP_API_BASE_URL + url, {
            ...(!tin && { email: data.email }),
            ...(tin && { tin: data.email }),
            password: data.password,
          })
          .then(response => {
            if (tin) {
              commit("setUser", response.data.vendor);
              commit("setScope", "vendor");
            } else {
              commit("setUser", response.data.user);
              commit("setScope", "user");
            }
            commit("setAuth", true);
            commit("setToken", response.data.token);
            resolve();
          })
          .catch(reject);
      });
    },
    logout: ({ commit, state }) => {
      let url = "logout";

      return new Promise((resolve, reject) => {
        axios
          .post(
            process.env.VUE_APP_API_BASE_URL + url,
            {},
            {
              headers: {
                authorization: "Bearer " + state.token,
              },
            }
          )
          .then(response => {
            commit("setUser", {});
            commit("setToken", "");
            commit("setScope", "");
            commit("setAuth", false);
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("scope");
            resolve();
          })
          .catch(reject);
      });
    },
  },
  modules: {},
});
