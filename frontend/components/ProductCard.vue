<script setup lang="ts">
defineProps<{
  product: {
    id: string
    title: string
    handle: string
    thumbnail?: string
    variants?: Array<{
      id: string
      title: string
      prices?: Array<{ amount: number; currency_code: string }>
    }>
  }
}>()
</script>

<template>
  <NuxtLink
    :to="`/product/${product.handle}`"
    class="group block bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-400 transition-all hover:shadow-md"
  >
    <div class="aspect-square bg-gray-100 overflow-hidden">
      <NuxtImg
        v-if="product.thumbnail"
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        provider="scaleway"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-gray-400 text-sm">
        Intet billede
      </div>
    </div>
    <div class="p-4">
      <h3 class="font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
        {{ product.title }}
      </h3>
      <p v-if="product.variants?.[0]?.prices?.[0]" class="text-gray-500 text-sm mt-1">
        Fra {{ (product.variants[0].prices[0].amount / 100).toFixed(2) }}
        {{ product.variants[0].prices[0].currency_code.toUpperCase() }}
      </p>
    </div>
  </NuxtLink>
</template>
