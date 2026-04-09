<script setup lang="ts">
const { t } = useI18n()
const consentGiven = useCookie('cookie_consent', { maxAge: 60 * 60 * 24 * 365 })
const visible = ref(false)

onMounted(() => {
  if (!consentGiven.value) {
    visible.value = true
  }
})

function accept() {
  consentGiven.value = 'accepted'
  visible.value = false
}

function decline() {
  consentGiven.value = 'declined'
  visible.value = false
}
</script>

<template>
  <Transition name="slide-up">
    <div
      v-if="visible"
      class="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white px-6 py-4"
    >
      <div class="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p class="text-sm">{{ t('cookie.message') }}</p>
        <div class="flex gap-3 shrink-0">
          <UButton size="sm" variant="outline" color="white" @click="decline">
            {{ t('cookie.decline') }}
          </UButton>
          <UButton size="sm" class="bg-white text-gray-900 hover:bg-gray-100" @click="accept">
            {{ t('cookie.accept') }}
          </UButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
