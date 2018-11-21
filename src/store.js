/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: false,
    savedMethods: [],
    isLoading: true,
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
      if (!_.isEmpty(state.savedMethods)) {
        _.forEach(state.savedMethods, method => method());
        console.log('saved methods are shot');
      }

      state.savedMethods = [];
    },
    startLoading(state) {
      state.isLoading = true;
    },
    endLoading(state) {
      state.isLoading = false;
      console.log('loading end');
    },
  },
  actions: {

  },
});
