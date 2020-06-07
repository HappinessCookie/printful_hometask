import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

import App from './App.vue';
import routers from './router';

Vue.use(VueRouter);
Vue.use(Vuetify);

const router = new VueRouter({
  mode: 'history',
  routes: routers,
});

new Vue({
  el: '#app',
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
});
