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
      redirect: "prehlad",
      component: () => import("@/layouts/full-layout/Layout"),
      children: [
        {
          name: "Prehlad",
          path: "prehlad",
          component: () => import("@/views/prehlad/Prehlad"),
        },
      ],
    },
    {
      path: "/projekty",
      component: () => import("@/layouts/full-layout/Layout"),
      children: [
        {
          name: "Osobné projekty",
          path: "osobne",
          component: () => import("@/views/projekty/osobne/ProjektyOsobne"),
        },
        {
          name: "Katedra projekty",
          path: "katedra",
          component: () => import("@/views/projekty/katedra/ProjektyKatedra"),
        },
        {
          name: "Fakulta projekty",
          path: "fakulta",
          component: () => import("@/views/projekty/fakulta/ProjektyFakulta"),
        },
        {
          name: "Univerzita projekty",
          path: "univerzita",
          component: () => import("@/views/projekty/univerzita/ProjektyUniverzita"),
        },
      ],
    },
    {
      path: "/publikacie",
      component: () => import("@/layouts/full-layout/Layout"),
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
        {
          name: "Univerzita publikácie",
          path: "univerzita",
          component: () => import("@/views/publikacie/univerzita/PublikacieUniverzita"),
        },
      ],
    },
    {
      path: "/vykazy",
      component: () => import("@/layouts/full-layout/Layout"),
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
