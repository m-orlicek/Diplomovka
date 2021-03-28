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

//google oauth
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: '760299115145-q6cbkf8cegrngrc8l4bvsarobof3rb91.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

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
  baseURL: 'https://some-domain.com/api/',
  render: (h) => h(App),
}).$mount("#app");
