import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 'abc123', name: 'Adam Adam', surname: 'Noy Noy'
    },
    categories: ['food', 'education', 'nature', 'animals', 'housing']
  },
  mutations: {},
  actions: {},
  modules: {}
});
