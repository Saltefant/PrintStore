export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',

  modules: [
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@nuxt/image',
  ],

  runtimeConfig: {
    public: {
      medusaBackendUrl: process.env.NUXT_PUBLIC_MEDUSA_BACKEND_URL || 'http://localhost:9000',
      directusUrl: process.env.NUXT_PUBLIC_DIRECTUS_URL || 'http://localhost:8055',
      stripePublishableKey: process.env.NUXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '',
      defaultLocale: process.env.NUXT_PUBLIC_DEFAULT_LOCALE || 'da',
    },
  },

  i18n: {
    locales: [
      { code: 'da', name: 'Dansk', iso: 'da-DK', file: 'da.json' },
      { code: 'en', name: 'English', iso: 'en-US', file: 'en.json' },
    ],
    defaultLocale: 'da',
    langDir: 'locales/',
    strategy: 'prefix_except_default',
    lazy: true,
  },

  image: {
    providers: {
      scaleway: {
        name: 'scaleway',
        provider: '~/providers/scaleway.ts',
        options: {
          baseURL: process.env.NUXT_S3_BASE_URL || 'https://s3.nl-ams.scw.cloud/printstore-assets',
        },
      },
    },
  },

  routeRules: {
    '/': { prerender: true },
    '/shop': { ssr: true },
    '/shop/**': { ssr: true },
    '/product/**': { ssr: true },
    '/cart': { ssr: false },
    '/checkout': { ssr: false },
    '/account': { ssr: false },
    '/account/**': { ssr: false },
  },

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'light',
  },
})
