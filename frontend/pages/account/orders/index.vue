<script setup lang="ts">
definePageMeta({ ssr: false })
const { t } = useI18n()
const { orders, pending } = useOrders()
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <h1 class="text-3xl font-bold mb-8">{{ t('account.your_orders') }}</h1>

    <div v-if="pending" class="animate-pulse space-y-4">
      <div v-for="i in 3" :key="i" class="h-20 bg-gray-200 rounded-lg" />
    </div>
    <div v-else-if="orders?.length" class="space-y-4">
      <NuxtLink
        v-for="order in orders"
        :key="order.id"
        :to="`/account/orders/${order.id}`"
        class="block border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
      >
        <div class="flex justify-between items-center">
          <div>
            <p class="font-semibold">Ordre #{{ order.display_id }}</p>
            <p class="text-sm text-gray-500">
              {{ new Date(order.created_at).toLocaleDateString('da-DK') }}
            </p>
          </div>
          <div class="text-right">
            <p class="font-semibold">{{ (order.total / 100).toFixed(2) }} DKK</p>
            <UBadge :color="order.status === 'completed' ? 'green' : 'yellow'">
              {{ order.status }}
            </UBadge>
          </div>
        </div>
      </NuxtLink>
    </div>
    <p v-else class="text-gray-500 text-center py-12">{{ t('account.no_orders_yet') }}</p>
  </div>
</template>
