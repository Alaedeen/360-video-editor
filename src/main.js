import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VeeValidate from 'vee-validate';
import Vuelidate from 'vuelidate'
import VueCookies from 'vue-cookies'
import aframe from 'aframe';
import registerClickDrag from 'aframe-click-drag-component';
import Axios from 'axios'
registerClickDrag(aframe);
Vue.prototype.$http = Axios;

import {
  routes
}from './routes';
import {
  store
} from './store/store'
Vue.use(VueRouter);
Vue.use(Vuetify)
Vue.use(VeeValidate);
Vue.use(Vuelidate)
Vue.use(VueCookies)
Vue.use(require('vue-shortkey'))
VeeValidate.Validator.extend('verify_password', {
  getMessage: field => `The password must contain at least: 1 uppercase letter, 1 lowercase letter, 1 number, and one special character (E.g. , .  & ? etc)`,
  validate: value => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(value);
  }
});

const router = new VueRouter({
  mode: 'history',
  routes
});

new Vue({
  el: '#app',
    router,
    store,
  render: h => h(App)
})
