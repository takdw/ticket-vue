import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "main" */ "../views/Wrappers/Main.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () =>
          import(/* webpackChunkName: "home" */ "../views/Home.vue"),
      },
      {
        path: "ticket/:id",
        name: "Ticket",
        component: () =>
          import(/* webpackChunkName: "ticket" */ "../views/Ticket.vue"),
      },
      {
        path: "ticket/:id/buy",
        name: "Buy Ticket",
        component: () =>
          import(/* webpackChunkName: "buy-ticket" */ "../views/BuyTicket.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "profile",
        name: "Profile",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
        meta: {
          requiresAuth: true,
        },
      },
      {
        path: "profile/edit",
        name: "Edit Profile",
        component: () =>
          import(
            /* webpackChunkName: "edit-profile" */ "../views/EditProfile.vue"
          ),
      },
      {
        path: "vendor",
        component: () =>
          import(/* webpackChunkName: "vendor" */ "../views/Vendor.vue"),
        children: [
          {
            path: "/",
            redirect: "/vendor/dashboard",
          },
          {
            path: "dashboard",
            name: "Vendor Dashboard",
            component: () =>
              import(
                /* webpackChunkName: "vendor-dashboard" */ "../views/Vendor/Dashboard.vue"
              ),
          },
          {
            path: "tickets",
            name: "Vendor Tickets",
            component: () =>
              import(
                /* webpackChunkName: "vendor-tickets" */ "../views/Vendor/Tickets.vue"
              ),
          },
          {
            path: "tickets/new",
            name: "New Vendor Ticket",
            component: () =>
              import(
                /* webpackChunkName: "new-vendor-ticket" */ "../views/Vendor/CreateTickets.vue"
              ),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Auth/Login.vue"),
  },
  {
    path: "/signup",
    name: "Sign Up",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Auth/SignUp.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

export default router;
