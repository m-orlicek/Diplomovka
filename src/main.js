import Vue from "vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store/store";
import Vuebar from "vuebar";
import "./plugins/base";
import VueSkycons from "vue-skycons";

//mocking
import { makeServer } from "@/server";
if (process.env.NODE_ENV === "development") {
  makeServer()
}

Vue.use(VueAxios, axios)

Vue.use(VueSkycons, {
  color: "#1e88e5",
});

Vue.config.productionTip = false;
Vue.use(Vuebar);

new Vue({
  vuetify,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
