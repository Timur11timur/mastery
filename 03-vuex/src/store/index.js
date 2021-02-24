import Vue from "vue";
import Vuex from "vuex";
import EventService from "@/services/EventService";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {
      id: 'abc123', name: 'Adam Adam', surname: 'Noy Noy'
    },
    categories: ['food', 'education', 'nature', 'animals', 'housing'],
    todos: [
      { id: 1, text: '...', done: true},
      { id: 2, text: '...', done: false},
      { id: 3, text: '...', done: true},
      { id: 4, text: '...', done: true},
      { id: 5, text: '...', done: false},
    ]
  },
  mutations: {
    ADD_EVENT(state, todo) {
      state.todos.push(todo)
    },
    SET_EVENTS(state, events) {
      state.events = events
    }
  },
  actions: {
    createTodo({commit}, todo) {
      return commit('ADD_EVENT', todo)
    },
    fetchEvents({ commit }, { perPage, page}) {
      EventService.getEvents(perPage, page)
          .then(response => {
            commit( 'SET_EVENTS', response.data)
          })
          .catch(error => {
            console.log('json-server unavailable. Please run in console: json-server --watch db.json. ' + error.response);
          })
    }
  },
  modules: {},
  getters: {
    categoryLength: state => {
      return state.categories.length
    },
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    activeTodosCount: (state, getters) => {
      return state.todos.length - getters.doneTodos.length
    },
    getTodoById: state => id => {
      return state.todos.find(todo => todo.id === id)
    }
  }
});
