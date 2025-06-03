import { createRouter, createWebHistory } from 'vue-router'
import Productlist from '../components/ListaProdutos.vue'
import ProductDetails from  '../components/DetalheProdutos.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Lista de Produtos',
      component: Productlist,
    },
    {
      path: '/Product',
      name: 'Detalhe do Produto',
      component: ProductDetails
    },
  ],
})

export default router
