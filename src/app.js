import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App.vue';
import routers from './router';

Vue.use(VueRouter);

const router = new VueRouter({
  routers,
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
