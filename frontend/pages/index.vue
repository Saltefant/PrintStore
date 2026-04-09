<script setup lang="ts">
const { t } = useI18n()
const config = useRuntimeConfig()

useSeoMeta({
  title: 'PrintStore – Kunst til dine vægge',
  description: 'Udforsk vores kollektion af håndplukkede kunsttryk',
  ogTitle: 'PrintStore',
  ogDescription: 'Kunst til dine vægge',
})
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="relative bg-gray-50 py-24 px-6 text-center">
      <h1 class="text-5xl font-bold text-gray-900 mb-4">{{ t('home.hero_title') }}</h1>
      <p class="text-xl text-gray-600 mb-8 max-w-xl mx-auto">{{ t('home.hero_subtitle') }}</p>
      <NuxtLink
        to="/shop"
        class="inline-block bg-gray-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
      >
        {{ t('home.shop_now') }}
      </NuxtLink>
    </section>

    <!-- Featured Products -->
    <section class="max-w-7xl mx-auto px-6 py-16">
      <h2 class="text-3xl font-bold text-gray-900 mb-8">{{ t('home.featured_prints') }}</h2>
      <FeaturedProducts />
    </section>
  </div>
</template>
