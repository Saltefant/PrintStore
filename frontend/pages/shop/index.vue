<script setup lang="ts">
const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const { products, categories, pending } = useProducts()

const selectedCategory = ref((route.query.category as string) || '')
const minPrice = ref(Number(route.query.min_price) || 0)
const maxPrice = ref(Number(route.query.max_price) || 10000)

watch([selectedCategory, minPrice, maxPrice], () => {
  router.push({
    query: {
      ...(selectedCategory.value ? { category: selectedCategory.value } : {}),
      ...(minPrice.value > 0 ? { min_price: minPrice.value } : {}),
      ...(maxPrice.value < 10000 ? { max_price: maxPrice.value } : {}),
    },
  })
})

useSeoMeta({
  title: 'Butik – PrintStore',
  description: 'Browse alle vores kunsttryk',
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ t('shop.title') }}</h1>

    <div class="flex gap-8">
      <!-- Filters Sidebar -->
      <aside class="w-64 shrink-0">
        <div class="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
          <div>
            <h3 class="font-semibold text-gray-700 mb-3">{{ t('shop.filter_category') }}</h3>
            <div class="space-y-2">
              <label class="flex items-center gap-2 cursor-pointer">
                <input v-model="selectedCategory" type="radio" value="" class="text-gray-900" />
                <span>{{ t('shop.all_categories') }}</span>
              </label>
              <label
                v-for="cat in categories"
                :key="cat.id"
                class="flex items-center gap-2 cursor-pointer"
              >
                <input v-model="selectedCategory" type="radio" :value="cat.handle" class="text-gray-900" />
                <span>{{ cat.name }}</span>
              </label>
            </div>
          </div>

          <div>
            <h3 class="font-semibold text-gray-700 mb-3">{{ t('shop.filter_price') }}</h3>
            <div class="space-y-2">
              <URange v-model="minPrice" :min="0" :max="10000" label="Min" />
              <URange v-model="maxPrice" :min="0" :max="10000" label="Max" />
              <div class="text-sm text-gray-500">{{ minPrice }} – {{ maxPrice }} DKK</div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Product Grid -->
      <div class="flex-1">
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
    </div>
  </div>
</template>
