import Vue from 'vue';
import Vuex from 'vuex';

import { user } from "./modules/users";
import { home } from "./modules/home";

Vue.use(Vuex);

export const store = new Vuex.Store({
  
  modules: {
    user,
    home
  }
});
