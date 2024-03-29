import Vue from 'vue';
import Vuex from 'vuex';

import { user } from "./modules/users";
import { home } from "./modules/home";
import { video } from "./modules/videos";
import { project } from "./modules/projects";

Vue.use(Vuex);

export const store = new Vuex.Store({

  modules: {
    user,
    home,
    video,
    project,
  }
});
