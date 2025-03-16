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

  content: {
    documentDriven: true,
    watch: {
      enabled: true
    },
    // Use the newer syntax for enabling preview features
    experimental: {
      clientDB: true,
      previewMode: true
    },
    api: {
      baseURL: '/api/_content'
    },
    markdown: {
      anchorLinks: true,
      toc: {
        depth: 3,
        searchDepth: 3
      }
    }
  },

  // Add route rules for content API
  routeRules: {
    '/api/_content/**': { 
      cache: { maxAge: 0 }
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

  runtimeConfig: {
    // Public keys that are exposed to the client
    public: {
      apiBaseUrl: process.env.NUXT_PUBLIC_API_BASE_URL || 'http://localhost:3000' 
    }
  },

  compatibilityDate: '2025-03-16'
})