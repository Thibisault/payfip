import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import PaymentPage from '../views/PaymentPage.vue';
import FactureApi from '@/components/FactureApi.vue';
import CollectiviteApi from '@/components/CollectiviteApi.vue';
import PaymentFacture from '@/views/PaymentFacture.vue';

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
  },
  {
    path: '/PaymentFacture',
    name: 'PaymentFacture',
    component: PaymentFacture
  },
  {
    path: '/facture',
    name: 'facture',
    component: FactureApi
  },
  {
    path: '/collectivite',
    name: 'collectivite',
    component: CollectiviteApi
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
