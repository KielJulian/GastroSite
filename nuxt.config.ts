// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  typescript: {
    strict: true,
    typeCheck: false,
    shim: false
  },

  modules: [
    '@nuxt/content',
    '@nuxthq/studio'
  ],

  nitro: {
    preset: 'vercel'
  },

  // Explicit content configuration to avoid errors
  content: {
    // documentDriven would normally cause an error, but moving to collection config
    // watch and live update content
    watch: {
      enabled: true
    }
  },

  app: {
    baseURL: '/',
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

  // Explicitly set the runtime config for the server
  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000'
    }
  }
})