import { defineNuxtPlugin } from '#app'

// This plugin ensures that the content module is properly initialized
export default defineNuxtPlugin(async (nuxtApp) => {
  // Simple plugin to ensure content is initialized
  if (process.dev) {
    console.log('Content plugin loaded')
  }
})