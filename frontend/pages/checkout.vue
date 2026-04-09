<script setup lang="ts">
definePageMeta({ ssr: false })
const { t } = useI18n()
const { cart, completeCart } = useCart()
const toast = useToast()
const router = useRouter()

const loading = ref(false)
const shippingAddress = reactive({
  first_name: '',
  last_name: '',
  address_1: '',
  city: '',
  postal_code: '',
  country_code: 'dk',
})

async function handleCheckout() {
  loading.value = true
  try {
    await completeCart(shippingAddress)
    toast.add({ title: 'Ordre gennemført!', color: 'green' })
    router.push('/account')
  } catch (e) {
    toast.add({ title: 'Noget gik galt', color: 'red' })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-4xl mx-auto px-6 py-12">
    <h1 class="text-4xl font-bold text-gray-900 mb-8">{{ t('checkout.title') }}</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Shipping Form -->
      <div>
        <h2 class="text-xl font-semibold mb-4">{{ t('checkout.shipping') }}</h2>
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <UFormGroup :label="t('account.first_name')">
              <UInput v-model="shippingAddress.first_name" />
            </UFormGroup>
            <UFormGroup :label="t('account.last_name')">
              <UInput v-model="shippingAddress.last_name" />
            </UFormGroup>
          </div>
          <UFormGroup label="Adresse">
            <UInput v-model="shippingAddress.address_1" />
          </UFormGroup>
          <div class="grid grid-cols-2 gap-4">
            <UFormGroup label="Postnummer">
              <UInput v-model="shippingAddress.postal_code" />
            </UFormGroup>
            <UFormGroup label="By">
              <UInput v-model="shippingAddress.city" />
            </UFormGroup>
          </div>
        </div>
      </div>

      <!-- Order Summary -->
      <div>
        <h2 class="text-xl font-semibold mb-4">Ordreoversigt</h2>
        <div class="bg-gray-50 rounded-lg p-6 space-y-3">
          <div
            v-for="item in cart?.items"
            :key="item.id"
            class="flex justify-between text-sm"
          >
            <span>{{ item.title }} × {{ item.quantity }}</span>
            <span>{{ ((item.unit_price * item.quantity) / 100).toFixed(2) }} DKK</span>
          </div>
          <div class="border-t border-gray-200 pt-3 flex justify-between font-semibold">
            <span>Total</span>
            <span>{{ ((cart?.total || 0) / 100).toFixed(2) }} DKK</span>
          </div>
        </div>

        <UButton
          size="xl"
          class="w-full mt-6 bg-gray-900 hover:bg-gray-700 text-white"
          :loading="loading"
          @click="handleCheckout"
        >
          {{ t('checkout.complete_order') }}
        </UButton>
      </div>
    </div>
  </div>
</template>
