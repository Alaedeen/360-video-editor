import Vue from 'vue';
import Vuex from 'vuex';

import { user } from "./modules/users";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    home: false,
    side: true//add mutations and actions and change all components
  },
  modules: {
    user
  }
});
