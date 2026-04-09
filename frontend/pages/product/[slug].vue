<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { product, pending } = useProduct(slug.value)
const { addToCart } = useCart()

const selectedVariantId = ref('')

const toast = useToast()

async function handleAddToCart() {
  if (!selectedVariantId.value) {
    toast.add({ title: t('product.select_size'), color: 'red' })
    return
  }
  await addToCart(selectedVariantId.value, 1)
  toast.add({ title: t('product.add_to_cart') + ' ✓', color: 'green' })
}

watchEffect(() => {
  if (product.value) {
    useSeoMeta({
      title: `${product.value.title} – PrintStore`,
      description: product.value.description || '',
      ogTitle: product.value.title,
      ogDescription: product.value.description || '',
      ogImage: product.value.thumbnail || '',
    })
  }
})
</script>

<template>
  <div class="max-w-6xl mx-auto px-6 py-12">
    <div v-if="pending" class="animate-pulse space-y-4">
      <div class="h-8 bg-gray-200 rounded w-1/2" />
      <div class="h-96 bg-gray-200 rounded" />
    </div>
    <div v-else-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Product Image -->
      <div class="aspect-square bg-gray-100 rounded-xl overflow-hidden">
        <NuxtImg
          v-if="product.thumbnail"
          :src="product.thumbnail"
          :alt="product.title"
          class="w-full h-full object-cover"
          provider="scaleway"
        />
        <div v-else class="w-full h-full flex items-center justify-center text-gray-400">
          No image
        </div>
      </div>

      <!-- Product Info -->
      <div class="space-y-6">
        <h1 class="text-4xl font-bold text-gray-900">{{ product.title }}</h1>
        <p class="text-gray-600 leading-relaxed">{{ product.description }}</p>

        <!-- Variant selector -->
        <div>
          <h3 class="font-semibold text-gray-700 mb-2">{{ t('product.size') }}</h3>
          <div class="flex gap-3 flex-wrap">
            <button
              v-for="variant in product.variants"
              :key="variant.id"
              class="px-4 py-2 border rounded-lg transition-colors"
              :class="selectedVariantId === variant.id
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 hover:border-gray-900'"
              @click="selectedVariantId = variant.id"
            >
              {{ variant.title }}
            </button>
          </div>
        </div>

        <!-- Price -->
        <div class="text-2xl font-bold text-gray-900">
          <span v-if="product.variants?.[0]?.prices?.[0]">
            {{ (product.variants[0].prices[0].amount / 100).toFixed(2) }}
            {{ product.variants[0].prices[0].currency_code.toUpperCase() }}
          </span>
        </div>

        <!-- Add to Cart -->
        <UButton
          size="xl"
          class="w-full bg-gray-900 hover:bg-gray-700 text-white"
          :disabled="!selectedVariantId"
          @click="handleAddToCart"
        >
          {{ t('product.add_to_cart') }}
        </UButton>
      </div>
    </div>
  </div>
</template>
