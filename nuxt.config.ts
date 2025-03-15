// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    strict: true
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n'
  ],

  content: {
    // Nuxt Content configuration
    documentDriven: true,
    navigation: {
      fields: ['title', 'description', 'order']
    }
  },

  i18n: {
    // Nuxt i18n configuration
    locales: [
      {
        code: 'en',
        name: 'English'
      },
      {
        code: 'de',
        name: 'Deutsch'
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix',
    vueI18n: './i18n.config.ts'
  },

  app: {
    head: {
      title: 'GastroSite',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'GastroSite Restaurant Website' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },

  css: [
    '@/assets/css/main.css'
  ],

  compatibilityDate: '2025-03-15'
})