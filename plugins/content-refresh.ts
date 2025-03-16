// Plugin to refresh Nuxt Content when updates are detected
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    // Set up a content refresh on page navigation
    nuxtApp.hook('page:finish', () => {
      // Clear Nuxt Content cache on each page navigation
      // This ensures we always get fresh content
      const contentCache = localStorage.getItem('nuxt-content-cache');
      if (contentCache) {
        // Clear cached content items to force refresh
        localStorage.removeItem('nuxt-content-cache');
      }
    });
    
    // Listen for storage events (if other tabs update content)
    window.addEventListener('storage', (event) => {
      if (event.key && event.key.startsWith('content-')) {
        // Trigger a refresh of the current page to get fresh content
        window.location.reload();
      }
    });
  }
});