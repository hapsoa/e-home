/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    savedMethods: [],
  },
  mutations: {
    login(state) {
      state.isLogin = true;
    },
    logout(state) {
      state.isLogin = false;
    },
    saveMethod(state, method) {
      state.savedMethods.push(method);
    },
    shotMethods(state) {
      console.log('saved methods are shot');
      console.log('savedMethods : ', state.savedMethods);
      if (!_.isEmpty(state.savedMethods)) _.forEach(state.savedMethods, method => method());
      state.savedMethods = [];
    },
  },
  actions: {

  },
});
