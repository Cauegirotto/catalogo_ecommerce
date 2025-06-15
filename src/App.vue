<template>
  <div v-if="isLoading" class="min-h-screen flex items-center justify-center bg-gray-100">
    <p class="text-gray-600">Loading...</p>
  </div>
  <div v-else class="min-h-screen flex flex-col bg-gray-100">
    <header class="bg-purple-900 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">Catálogo E-commerce</h1>
        <input
          v-model="searchQuery"
          @input="searchProducts"
          type="text"
          placeholder="Search products..."
          class="p-2 rounded text-black w-64"
        />
      </div>
    </header>
    <div class="container mx-auto flex flex-1 gap-4 p-4">
      <CategoryMenuView :categories="categories" @filter="filterByCategory" />
      <router-view
        :products="displayedProducts"
        :total-pages="totalPages"
        :current-page="currentPage"
        @change-page="changePage"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import CategoryMenuView from '@/views/CategoryMenuView.vue'
import ProductService from '@/services/ProductService.js'
import FilterService from '@/services/FilterService.js'

export default {
  components: { CategoryMenuView },
  setup() {
    const products = ref([])
    const categories = ref([])
    const selectedCategory = ref('')
    const searchQuery = ref('')
    const currentPage = ref(1)
    const isLoading = ref(true)

    const fetchProducts = async () => {
      try {
        products.value = await ProductService.getProducts()
        categories.value = [...new Set(products.value.map(p => p.category))]
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        isLoading.value = false
      }
    }

    const filterService = new FilterService(products, selectedCategory, searchQuery, currentPage)

    const displayedProducts = filterService.displayedProducts
    const totalPages = filterService.totalPages

    const filterByCategory = (category) => {
      selectedCategory.value = category
      currentPage.value = 1
    }

    const searchProducts = () => {
      currentPage.value = 1
    }

    const changePage = (page) => {
      currentPage.value = page
    }

    fetchProducts()

    return {
      categories,
      selectedCategory,
      searchQuery,
      currentPage,
      displayedProducts,
      totalPages,
      filterByCategory,
      searchProducts,
      changePage,
      isLoading,
    }
  },
}
</script>