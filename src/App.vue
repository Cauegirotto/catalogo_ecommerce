<template>
  <div class="min-h-screen flex flex-col bg-gray-100">

    <header class="bg-blue-600 text-white p-4 shadow-md">
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
      <CategoryMenu :categories="categories" @filter="filterByCategory" />
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
import { ref, computed } from 'vue'
import axios from 'axios'
import CategoryMenu from './components/MenuCategoria.vue'

export default {
  components: { CategoryMenu },
  setup() {
    const products = ref([])
    const categories = ref([])
    const selectedCategory = ref('')
    const searchQuery = ref('')
    const currentPage = ref(1)
    const productsPerPage = 9

    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/products?limit=100')
        products.value = response.data.products
        categories.value = [...new Set(products.value.map(p => p.category))]
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }

    const filteredProducts = computed(() => {
      let filtered = products.value
      if (selectedCategory.value) {
        filtered = filtered.filter(p => p.category === selectedCategory.value)
      }
      if (searchQuery.value) {
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        )
      }
      return filtered
    })

    const totalPages = computed(() =>
      Math.ceil(filteredProducts.value.length / productsPerPage)
    )

    const displayedProducts = computed(() => {
      const start = (currentPage.value - 1) * productsPerPage
      const end = start + productsPerPage
      return filteredProducts.value.slice(start, end)
    })

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
      productsPerPage,
      displayedProducts,
      totalPages,
      filterByCategory,
      searchProducts,
      changePage
    }
  }
}
</script>
