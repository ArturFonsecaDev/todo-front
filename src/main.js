import Vue from 'vue';
import App from './App.vue';
import './assets/style.css';
import router from './router.js';
import store from './store.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');

