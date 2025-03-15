import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin(async (nuxtApp) => {
  // Wait for i18n to be ready
  await nuxtApp.runWithContext(() => {
    const i18n = nuxtApp.$i18n
    
    // You can also add runtime translation setup here
    // For example, forcing a language for testing
    if (process.dev) {
      console.log('i18n plugin loaded')
    }
  })
})