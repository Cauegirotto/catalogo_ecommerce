import axios from 'axios'

export default {
  async getProducts() {
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=100')
      return response.data.products
    } catch (error) {
      console.error('Error fetching products:', error)
      return []
    }
  },

  async getProductById(id) {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching product:', error)
      return null
    }
  },
}
