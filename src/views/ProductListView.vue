<template>
  <div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white p-4 rounded shadow hover:shadow-lg cursor-pointer"
        @click="$router.push({ name: 'ProductDetail', params: { id: product.id } })"
      >
        <img :src="product.thumbnail" alt="Product image" class="w-full h-48 object-cover rounded" />
        <h3 class="text-lg font-semibold mt-2">{{ product.title }}</h3>
        <p class="text-gray-600">${{ product.price }}</p>
      </div>
    </div>
    <div class="mt-6 flex justify-center gap-2">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="$emit('change-page', page)"
        class="px-4 py-2 rounded"
        :class="currentPage === page ? 'bg-blue-600 text-white' : 'bg-gray-200'"
      >
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      default: () => [],
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    currentPage: {
      type: Number,
      default: 1,
    },
  },
}
</script>
