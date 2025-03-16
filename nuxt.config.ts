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
    preset: 'vercel',
    // Important for content API to work correctly
    routeRules: {
      '/api/_content/**': { 
        cache: false,
        headers: {
          'cache-control': 'no-cache, no-store'
        }
      }
    }
  },

  // Simple content configuration to avoid TS errors
  content: {},

  // These routes will not be cached on Vercel
  routeRules: {
    '/api/**': { 
      cache: false
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
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000',
      studioUrl: 'https://nuxt.studio',
      studioApiUrl: 'https://api.nuxt.studio'
    }
  },

  compatibilityDate: '2025-03-16'
})