import { createRouter, createWebHistory } from 'vue-router'
import ProductDetailView from '../views/ProductDetailView.vue'
import ProductListView from '../views/ProductListView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'ProductList',
      component: ProductListView,
    },
    {
      path: '/product/:id',
      name: 'ProductDetail',
      component:  ProductDetailView
    },
  ],
})

export default router
