<script setup lang="ts">
definePageMeta({ ssr: false })
const route = useRoute()
const { t } = useI18n()
const { order, pending } = useOrder(route.params.id as string)

watchEffect(() => {
  if (order.value) {
    useSeoMeta({ title: `Ordre #${order.value.display_id} – PrintStore` })
  }
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <NuxtLink to="/account/orders" class="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block">
      {{ t('account.back_to_orders') }}
    </NuxtLink>

    <div v-if="pending" class="animate-pulse">
      <div class="h-8 bg-gray-200 rounded w-1/3 mb-4" />
      <div class="h-64 bg-gray-200 rounded" />
    </div>
    <div v-else-if="order">
      <h1 class="text-3xl font-bold mb-2">Ordre #{{ order.display_id }}</h1>
      <p class="text-gray-500 mb-8">
        {{ new Date(order.created_at).toLocaleDateString('da-DK') }}
      </p>

      <div class="border border-gray-200 rounded-lg overflow-hidden">
        <div
          v-for="item in order.items"
          :key="item.id"
          class="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0"
        >
          <div class="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
            <NuxtImg
              v-if="item.thumbnail"
              :src="item.thumbnail"
              :alt="item.title"
              class="w-full h-full object-cover"
            />
          </div>
          <div class="flex-1">
            <p class="font-semibold">{{ item.title }}</p>
            <p class="text-sm text-gray-500">{{ item.variant?.title }}</p>
          </div>
          <div class="text-right">
            <p>× {{ item.quantity }}</p>
            <p class="font-semibold">{{ ((item.unit_price * item.quantity) / 100).toFixed(2) }} DKK</p>
          </div>
        </div>
      </div>

      <div class="mt-6 flex justify-between font-bold text-lg">
        <span>Total</span>
        <span>{{ (order.total / 100).toFixed(2) }} DKK</span>
      </div>
    </div>
  </div>
</template>
