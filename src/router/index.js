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
        path: "tickets",
        name: "Tickets",
        component: () =>
          import(/* webpackChunkName: "tickets" */ "../views/Tickets.vue"),
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
          scope: "user",
        },
      },
      {
        path: "profile",
        name: "Profile",
        component: () =>
          import(/* webpackChunkName: "profile" */ "../views/Profile.vue"),
        meta: {
          requiresAuth: true,
          scope: "user",
        },
      },
      {
        path: "profile/edit",
        name: "Edit Profile",
        component: () =>
          import(
            /* webpackChunkName: "edit-profile" */ "../views/EditProfile.vue"
          ),
        meta: {
          requiresAuth: true,
          scope: "user",
        },
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
            meta: {
              requiresAuth: true,
              scope: "vendor",
            },
          },
          {
            path: "tickets",
            name: "Vendor Tickets",
            component: () =>
              import(
                /* webpackChunkName: "vendor-tickets" */ "../views/Vendor/Tickets.vue"
              ),
            meta: {
              requiresAuth: true,
              scope: "vendor",
            },
          },
          {
            path: "edit",
            name: "Edit Vendor",
            component: () =>
              import(
                /* webpackChunkName: "vendor-edit" */ "../views/Vendor/Edit.vue"
              ),
            meta: {
              requiresAuth: true,
              scope: "vendor",
            },
          },
          {
            path: "tickets/new",
            name: "New Vendor Ticket",
            component: () =>
              import(
                /* webpackChunkName: "new-vendor-ticket" */ "../views/Vendor/CreateTickets.vue"
              ),
            meta: {
              requiresAuth: true,
              scope: "vendor",
            },
          },
          {
            path: "tickets/:id/edit",
            name: "Edit Vendor Ticket",
            component: () =>
              import(
                /* webpackChunkName: "edit-vendor-ticket" */ "../views/Vendor/EditTicket.vue"
              ),
            meta: {
              requiresAuth: true,
              scope: "vendor",
            },
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
  {
    path: "/admin/login",
    name: "Admin Login",
    component: () =>
      import(/* webpackChunkName: "admin-login" */ "../views/Admin/Login.vue"),
  },
  {
    path: "/admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin.vue"),
    children: [
      {
        path: "/",
        redirect: "/admin/dashboard",
      },
      {
        path: "dashboard",
        name: "Admin Dashboard",
        component: () =>
          import(
            /* webpackChunkName: "admin-dashboard" */ "../views/Admin/Dashboard.vue"
          ),
        meta: {
          requiresAdmin: true,
        },
      },
      {
        path: "vendors",
        name: "Admin Vendors",
        component: () =>
          import(
            /* webpackChunkName: "admin-vendors" */ "../views/Admin/Vendors.vue"
          ),
        meta: {
          requiresAdmin: true,
        },
      },
      {
        path: "tickets",
        name: "Admin Tickets",
        component: () =>
          import(
            /* webpackChunkName: "admin-tickets" */ "../views/Admin/Tickets.vue"
          ),
        meta: {
          requiresAdmin: true,
        },
      },
      {
        path: "users",
        name: "Admin Users",
        component: () =>
          import(
            /* webpackChunkName: "admin-users" */ "../views/Admin/Users.vue"
          ),
        meta: {
          requiresAdmin: true,
        },
      },
      {
        path: "settings",
        name: "Admin Settings",
        component: () =>
          import(
            /* webpackChunkName: "admin-settings" */ "../views/Admin/Settings.vue"
          ),
        meta: {
          requiresAdmin: true,
        },
      },
    ],
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
