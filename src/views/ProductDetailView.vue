<template>
  <div class="bg-white p-6 rounded shadow">
    <button @click="$router.push({ name: 'ProductList' })" class="text-blue-600 mb-4">← Back to Products</button>
    <div v-if="product" class="flex gap-4">
      <img :src="product.thumbnail" alt="Product image" class="w-1/2 h-64 object-cover rounded" />
      <div>
        <h2 class="text-2xl font-bold">{{ product.title }}</h2>
        <p class="text-gray-600 mt-2">{{ product.description }}</p>
        <p class="text-lg font-semibold mt-2">${{ product.price }}</p>
        <p class="text-gray-500 mt-2">Category: {{ product.category }}</p>
        <p class="text-gray-500">Rating: {{ product.rating }}/5</p>
      </div>
    </div>
    <div v-else>
      <p class="text-gray-600">Loading product details...</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import ProductService from '@/services/ProductService.js'

export default {
  setup() {
    const route = useRoute()
    const product = ref(null)

    const fetchProduct = async () => {
      const productId = route.params.id
      if (productId) {
        try {
          product.value = await ProductService.getProductById(productId)
        } catch (error) {
          console.error('Error fetching product:', error)
        }
      }
    }

    onMounted(fetchProduct)

    return { product }
  },
}
</script>