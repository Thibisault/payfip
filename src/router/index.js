import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import PaymentPage from '../views/PaymentPage.vue';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage
  },
  
  {
    path: '/PaymentPage',
    name: 'PaymentPage',
    component: PaymentPage
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
