<template>
  <aside class="w-1/4 bg-white p-4 rounded shadow">
    <h2 class="text-xl font-semibold mb-4">Categories</h2>
    <ul class="space-y-2">
      <li>
        <button
          @click="$emit('filter', '')"
          class="w-full text-left p-2 hover:bg-blue-100 rounded"
          :class="{ 'bg-blue-200': !selectedCategory }"
        >
          All
        </button>
      </li>
      <li v-for="category in categories" :key="category">
        <button
          @click="$emit('filter', category)"
          class="w-full text-left p-2 hover:bg-blue-100 rounded"
          :class="{ 'bg-blue-200': selectedCategory === category }"
        >
          {{ category }}
        </button>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    categories: Array,
    selectedCategory: String
  }
}
</script>