import { createRouter, createWebHistory } from 'vue-router'
import Productlist from '../components/ListaProdutos.vue'
import ProductDetails from  '../components/DetalheProdutos.vue'
import DetalheProdutos from '../components/DetalheProdutos.vue'
import ListaProdutos from '../components/ListaProdutos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ListaProdutos',
      component: ListaProdutos,
    },
    {
      path: '/Product',
      name: 'DetalheProdutos',
      component: DetalheProdutos
    },
  ],
})

export default router
