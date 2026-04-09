<script setup lang="ts">
const { products, pending } = useProducts()
const featured = computed(() => products.value?.slice(0, 3) || [])
</script>

<template>
  <div>
    <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <div v-for="i in 3" :key="i" class="animate-pulse bg-gray-200 rounded-xl h-80" />
    </div>
    <div v-else class="grid grid-cols-1 sm:grid-cols-3 gap-6">
      <ProductCard v-for="product in featured" :key="product.id" :product="product" />
    </div>
  </div>
</template>
