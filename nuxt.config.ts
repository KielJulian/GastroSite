// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: process.env.NODE_ENV === 'development' },

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  },

  modules: [
    '@nuxt/content',
    '@nuxthq/studio'
  ],

  nitro: {
    prerender: {
      failOnError: false,
      ignore: ['/api/**']
    }
  },
  
  studio: {
    enabled: true
  },

  content: {},


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