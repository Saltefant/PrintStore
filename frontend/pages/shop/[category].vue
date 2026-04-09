<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const categoryHandle = computed(() => route.params.category as string)

const { products, pending } = useProducts({ category: categoryHandle.value })

useSeoMeta({
  title: () => `${categoryHandle.value} – PrintStore`,
  description: () => `Browse ${categoryHandle.value} prints`,
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <NuxtLink to="/shop" class="text-sm text-gray-500 hover:text-gray-700 mb-4 inline-block">
      ← Tilbage til butik
    </NuxtLink>
    <h1 class="text-4xl font-bold text-gray-900 mb-8 capitalize">{{ categoryHandle }}</h1>

    <div v-if="pending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="animate-pulse bg-gray-200 rounded-lg h-80" />
    </div>
    <div v-else-if="products?.length" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <p v-else class="text-gray-500 text-center py-12">{{ t('shop.no_products') }}</p>
  </div>
</template>
