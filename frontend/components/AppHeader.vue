<script setup lang="ts">
const { t, locale, locales, setLocale } = useI18n()
const { cart } = useCart()
const { customer } = useCustomer()

const cartCount = computed(() =>
  cart.value?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) || 0,
)

const availableLocales = computed(() =>
  (locales.value as any[]).filter((l: any) => l.code !== locale.value),
)
</script>

<template>
  <header class="sticky top-0 z-50 bg-white border-b border-gray-200">
    <nav class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <NuxtLink to="/" class="text-2xl font-bold text-gray-900 tracking-tight">
        PrintStore
      </NuxtLink>

      <div class="flex items-center gap-6">
        <NuxtLink
          to="/shop"
          class="text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          {{ t('nav.shop') }}
        </NuxtLink>

        <NuxtLink
          to="/cart"
          class="relative text-gray-600 hover:text-gray-900 transition-colors"
        >
          <UIcon name="i-heroicons-shopping-cart" class="w-6 h-6" />
          <span
            v-if="cartCount > 0"
            class="absolute -top-2 -right-2 bg-gray-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ cartCount }}
          </span>
        </NuxtLink>

        <NuxtLink
          to="/account"
          class="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <UIcon name="i-heroicons-user" class="w-6 h-6" />
        </NuxtLink>

        <button
          v-for="loc in availableLocales"
          :key="loc.code"
          class="text-sm text-gray-500 hover:text-gray-900 uppercase font-medium"
          @click="setLocale(loc.code)"
        >
          {{ loc.code }}
        </button>
      </div>
    </nav>
  </header>
</template>
