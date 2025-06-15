import { computed } from 'vue'

export default class FilterService {
  constructor(products, selectedCategory, searchQuery, currentPage) {
    this.products = products
    this.selectedCategory = selectedCategory
    this.searchQuery = searchQuery
    this.currentPage = currentPage
    this.productsPerPage = 9

    this.filteredProducts = computed(() => {
      let filtered = this.products.value || []
      if (this.selectedCategory.value) {
        filtered = filtered.filter(p => p.category === this.selectedCategory.value)
      }
      if (this.searchQuery.value) {
        filtered = filtered.filter(p =>
          p.title.toLowerCase().includes(this.searchQuery.value.toLowerCase())
        )
      }
      return filtered
    })

    this.totalPages = computed(() =>
      Math.ceil(this.filteredProducts.value.length / this.productsPerPage)
    )

    this.displayedProducts = computed(() => {
      const start = (this.currentPage.value - 1) * this.productsPerPage
      const end = start + this.productsPerPage
      return this.filteredProducts.value.slice(start, end)
    })
  }
}
 