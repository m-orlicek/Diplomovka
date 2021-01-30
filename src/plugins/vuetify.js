import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@/scss/vuetify/overrides.scss'
Vue.use(Vuetify);

const theme = {
    primary: '#28b8ce',
    info: '#28b8ce',
    success: '#4BB543',
    accent: '#fc4b6c',
    default: '#563dea'
}

export default new Vuetify({
    theme: {
        themes: {
          dark: theme,
          light: theme,
        },
      }
});
