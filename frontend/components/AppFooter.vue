<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <footer class="bg-gray-900 text-gray-300 py-12 px-6 mt-auto">
    <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <div>
        <h3 class="text-white font-bold text-xl mb-3">PrintStore</h3>
        <p class="text-sm leading-relaxed">
          {{ t('footer.description') }}
        </p>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">{{ t('footer.links') }}</h4>
        <ul class="space-y-2 text-sm">
          <li><NuxtLink to="/shop" class="hover:text-white transition-colors">{{ t('nav.shop') }}</NuxtLink></li>
          <li><NuxtLink to="/account" class="hover:text-white transition-colors">{{ t('nav.account') }}</NuxtLink></li>
          <li><NuxtLink to="/cart" class="hover:text-white transition-colors">{{ t('nav.cart') }}</NuxtLink></li>
        </ul>
      </div>
      <div>
        <h4 class="text-white font-semibold mb-3">{{ t('footer.contact') }}</h4>
        <p class="text-sm">hej@printstore.dk</p>
      </div>
    </div>
    <div class="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-sm text-center">
      {{ t('footer.copyright', { year: new Date().getFullYear() }) }}
    </div>
  </footer>
</template>
