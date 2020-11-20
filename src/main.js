import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

var token = window.localStorage.getItem("token") || "";
var scope = window.localStorage.getItem("scope") || "user";
store.commit("setToken", token);
store.commit("setScope", scope);

Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
});

Vue.prototype.$http.interceptors.request.use(req => {
  token = store.state.token || "";
  req.headers.Authorization = "Bearer " + token;

  return req;
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
    next("/login");
  }
  next();
});

store
  .dispatch("check")
  .catch(err => {})
  .finally(() => {
    new Vue({
      router,
      store,
      render: h => h(App),
    }).$mount("#app");
  });
