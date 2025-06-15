<template>
  <div class="category-menu">
    <h3>Categorias</h3>
    <ul>
      <li v-for="category in categories" :key="category" @click="$emit('category-selected', category)">
        {{ category }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryMenu',
  props: {
    categories: {
      type: Array,
      default: () => ['Eletrônicos', 'Roupas', 'Alimentos']
    }
  }
}
</script>