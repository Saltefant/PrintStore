<script setup lang="ts">
definePageMeta({ ssr: false })
const { t } = useI18n()
const { cart, removeFromCart, updateQuantity } = useCart()
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ t('cart.title') }}</h1>

    <div v-if="!cart?.items?.length" class="text-center py-16 text-gray-500">
      <p class="text-xl">{{ t('cart.empty') }}</p>
      <NuxtLink to="/shop" class="mt-4 inline-block text-gray-900 underline">
        {{ t('home.shop_now') }}
      </NuxtLink>
    </div>

    <div v-else>
      <div class="space-y-4 mb-8">
        <div
          v-for="item in cart.items"
          :key="item.id"
          class="flex items-center gap-6 border-b border-gray-200 pb-4"
        >
          <div class="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden shrink-0">
            <NuxtImg
              v-if="item.thumbnail"
              :src="item.thumbnail"
              :alt="item.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900">{{ item.title }}</h3>
            <p class="text-sm text-gray-500">{{ item.variant?.title }}</p>
          </div>
          <div class="flex items-center gap-3">
            <UButton
              variant="ghost"
              size="sm"
              icon="i-heroicons-minus"
              @click="updateQuantity(item.id, item.quantity - 1)"
            />
            <span class="w-8 text-center">{{ item.quantity }}</span>
            <UButton
              variant="ghost"
              size="sm"
              icon="i-heroicons-plus"
              @click="updateQuantity(item.id, item.quantity + 1)"
            />
          </div>
          <div class="text-right">
            <p class="font-semibold">
              {{ ((item.unit_price * item.quantity) / 100).toFixed(2) }} DKK
            </p>
            <UButton
              variant="ghost"
              size="xs"
              color="red"
              @click="removeFromCart(item.id)"
            >
              {{ t('cart.remove') }}
            </UButton>
          </div>
        </div>
      </div>

      <div class="flex justify-between items-center py-4 border-t border-gray-200">
        <span class="text-xl font-bold">{{ t('cart.total') }}</span>
        <span class="text-xl font-bold">
          {{ ((cart.total || 0) / 100).toFixed(2) }} DKK
        </span>
      </div>

      <NuxtLink
        to="/checkout"
        class="block w-full bg-gray-900 text-white text-center py-4 rounded-lg font-medium hover:bg-gray-700 mt-6 transition-colors"
      >
        {{ t('cart.checkout') }}
      </NuxtLink>
    </div>
  </div>
</template>
