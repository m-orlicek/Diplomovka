import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";

import store from "@/store/store";

Vue.use(Router);

store.dispatch("AutoLogin");

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  // This is for the scroll top when click on any router link
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0;

    if (to.hash) {
      scrollTo = to.hash;
    } else if (savedPosition) {
      scrollTo = savedPosition.y;
    }

    return goTo(scrollTo);
  },
  // This is for the scroll top when click on any router link
  routes: [
    {
      path: "/",
      redirect: "boxedlogin",
      component: () => import("@/layouts/blank-layout/Blanklayout"),
      children: [
        {
          name: "BoxedLogin",
          path: "boxedlogin",
          component: () => import("@/views/authentication/BoxedLogin"),
        },
        {
          name: "BoxedRegister",
          path: "boxedregister",
          component: () => import("@/views/authentication/BoxedRegister"),
        },
        {
          name: "Error",
          path: "error",
          component: () => import("@/views/authentication/Error"),
        },
      ],
    },
    {
      path: "/prehlad",
      component: () => import("@/layouts/full-layout/Layout"),
      beforeEnter(to, from, next) {
        if (store.state.idToken) {
          next();
        } else {
          next("boxedlogin");
        }
      },
      children: [
        {
          name: "Prehlad",
          path: "",
          component: () => import("@/views/prehlad/Prehlad"),
        },
      ],
    },
    {
      path: "/projekty",
      component: () => import("@/layouts/full-layout/Layout"),
      beforeEnter(to, from, next) {
        if (store.state.idToken) {
          next();
        } else {
          next("boxedlogin");
        }
      },
      children: [
        {
          name: "Osobné projekty",
          path: "osobne",
          component: () => import("@/views/projekty/ProjektyOsobne"),
        },
        {
          name: "Katedra projekty",
          path: "katedra",
          component: () => import("@/views/projekty/ProjektyKatedra"),
        },
        {
          name: "Fakulta projekty",
          path: "fakulta",
          component: () => import("@/views/projekty/ProjektyFakulta"),
        },
      ],
    },
    {
      path: "/publikacie",
      component: () => import("@/layouts/full-layout/Layout"),
      beforeEnter(to, from, next) {
        if (store.state.idToken) {
          next();
        } else {
          next("boxedlogin");
        }
      },
      children: [
        {
          name: "Osobné publikácie",
          path: "osobne",
          component: () => import("@/views/publikacie/osobne/PublikacieOsobne"),
        },
        {
          name: "Katedra publikácie",
          path: "katedra",
          component: () => import("@/views/publikacie/katedra/PublikacieKatedra"),
        },
        {
          name: "Fakulta publikácie",
          path: "fakulta",
          component: () => import("@/views/publikacie/fakulta/PublikacieFakulta"),
        },
      ],
    },
    {
      path: "/vykazy",
      component: () => import("@/layouts/full-layout/Layout"),
      beforeEnter(to, from, next) {
        if (store.state.idToken) {
          next();
        } else {
          next("boxedlogin");
        }
      },
      children: [
        {
          name: "Výkazy",
          path: "",
          component: () => import("@/views/vykazy/Vykazy"),
        },
      ],
    },
    {
      path: "/*",
      redirect: "prehlad",
      component: () => import("@/layouts/full-layout/Layout")
    },
  ],
});

import NProgress from "nprogress";

router.beforeResolve((to, from, next) => {
  // If this isn't an initial page load.
  if (to.name) {
    // Start the route progress bar.
    NProgress.start(800);
  }
  next();
});

router.afterEach(() => {
  // Complete the animation of the route progress bar.
  NProgress.done();
});

export default router;
