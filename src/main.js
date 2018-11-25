import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faUserSecret, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

// import 'bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';

// font-awesome setting
library.add(faCoffee);
library.add(faUserSecret);
library.add(faTimes);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
