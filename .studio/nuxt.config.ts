// Import defineNuxtConfig from nuxt/config
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  content: {
    documentDriven: true,
    experimental: {
      clientDB: true,
      stripQueryParameters: true
    }
  }
})
