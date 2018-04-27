import Vue from 'vue'
import App from './App.vue'
//bibliotecas de rotas
import VueRouter from 'vue-router'; 
import { routes } from './router';


Vue.use(VueRouter);

// colocando rotas
const router = new VueRouter({
  routes,
  mode: 'history' // tirar a '#' das URLs
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
