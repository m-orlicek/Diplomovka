import Vue from "vue";
import Router from "vue-router";
import goTo from "vuetify/es5/services/goto";

Vue.use(Router);

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
      redirect: "starterpage",
      component: () => import("@/layouts/full-layout/Layout"),
      children: [
        {
          name: "StarterPage",
          path: "starterpage",
          component: () => import("@/views/StarterPage"),
        },
      ],
    },
    {
      path: "/projekty",
      component: () => import("@/layouts/full-layout/Layout"),
      children: [
        {
          name: "Osobné",
          path: "projekty-osobne",
          component: () => import("@/views/projekty/ProjektyOsobne"),
        },
        {
          name: "Katedra",
          path: "projekty-katedra",
          component: () => import("@/views/projekty/ProjektyKatedra"),
        },
        {
          name: "Fakulta",
          path: "projekty-fakulta",
          component: () => import("@/views/projekty/ProjektyFakulta"),
        },
        {
          name: "Univerzita",
          path: "projekty-univerzita",
          component: () => import("@/views/projekty/ProjektyUniverzita"),
        },
      ],
    },
    {
      path: "/publikacie",
      component: () => import("@/layouts/full-layout/Layout"),
      children: [
        {
          name: "Osobné",
          path: "publikacie-osobne",
          component: () => import("@/views/publikacie/PublikacieOsobne"),
        },
        {
          name: "Katedra",
          path: "publikacie-katedra",
          component: () => import("@/views/publikacie/PublikacieKatedra"),
        },
        {
          name: "Fakulta",
          path: "publikacie-fakulta",
          component: () => import("@/views/publikacie/PublikacieFakulta"),
        },
        {
          name: "Univerzita",
          path: "publikacie-univerzita",
          component: () => import("@/views/publikacie/PublikacieUniverzita"),
        },
      ],
    },
    {
      path: "/authentication",
      component: () => import("@/layouts/blank-layout/Blanklayout"),
      children: [
        {
          name: "BoxedLogin",
          path: "boxedlogin",
          component: () => import("@/views/authentication/BoxedLogin"),
        },
        {
          name: "FullLogin",
          path: "fulllogin",
          component: () => import("@/views/authentication/FullLogin"),
        },
        {
          name: "BoxedRegister",
          path: "boxedregister",
          component: () => import("@/views/authentication/BoxedRegister"),
        },
        {
          name: "FullRegister",
          path: "fullregister",
          component: () => import("@/views/authentication/FullRegister"),
        },
        {
          name: "Error",
          path: "error",
          component: () => import("@/views/authentication/Error"),
        },
      ],
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
