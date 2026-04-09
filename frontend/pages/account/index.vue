<script setup lang="ts">
definePageMeta({ ssr: false })
const { t } = useI18n()
const { customer, login, register, logout } = useCustomer()
const toast = useToast()

const mode = ref<'login' | 'register'>('login')
const form = reactive({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
})

async function handleSubmit() {
  try {
    if (mode.value === 'login') {
      await login(form.email, form.password)
    } else {
      await register(form)
    }
    toast.add({ title: t('account.welcome'), color: 'green' })
  } catch (e) {
    toast.add({ title: t('account.error_try_again'), color: 'red' })
  }
}
</script>

<template>
  <div class="max-w-md mx-auto px-6 py-16">
    <!-- Logged in view -->
    <div v-if="customer">
      <h1 class="text-3xl font-bold mb-2">Hej, {{ customer.first_name }}!</h1>
      <p class="text-gray-500 mb-8">{{ customer.email }}</p>
      <div class="space-y-3">
        <NuxtLink
          to="/account/orders"
          class="block w-full border border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors"
        >
          {{ t('account.orders') }}
        </NuxtLink>
        <UButton variant="ghost" class="w-full text-red-500" @click="logout">
          {{ t('account.logout') }}
        </UButton>
      </div>
    </div>

    <!-- Auth form -->
    <div v-else>
      <h1 class="text-3xl font-bold mb-8">
        {{ mode === 'login' ? t('account.login') : t('account.register') }}
      </h1>

      <form class="space-y-4" @submit.prevent="handleSubmit">
        <template v-if="mode === 'register'">
          <UFormGroup :label="t('account.first_name')">
            <UInput v-model="form.first_name" required />
          </UFormGroup>
          <UFormGroup :label="t('account.last_name')">
            <UInput v-model="form.last_name" required />
          </UFormGroup>
        </template>
        <UFormGroup :label="t('account.email')">
          <UInput v-model="form.email" type="email" required />
        </UFormGroup>
        <UFormGroup :label="t('account.password')">
          <UInput v-model="form.password" type="password" required />
        </UFormGroup>
        <UButton type="submit" class="w-full bg-gray-900 text-white hover:bg-gray-700">
          {{ mode === 'login' ? t('account.login') : t('account.register') }}
        </UButton>
      </form>

      <p class="mt-4 text-center text-sm text-gray-500">
        <button
          class="text-gray-900 underline"
          @click="mode = mode === 'login' ? 'register' : 'login'"
        >
          {{ mode === 'login' ? t('account.register') : t('account.login') }}
        </button>
      </p>
    </div>
  </div>
</template>
