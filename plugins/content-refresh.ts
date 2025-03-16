// Plugin to refresh Nuxt Content when updates are detected
import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    console.log('Registering content plugin');
    
    // Force clear all caches on initial load
    const clearAllCaches = () => {
      console.log('Clearing all content caches');
      
      // Clear all nuxt-data keys
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (
          key.startsWith('nuxt-data-') ||
          key.startsWith('content-') ||
          key === 'nuxt-content-cache'
        )) {
          console.log('Removing cache key:', key);
          localStorage.removeItem(key);
        }
      }
    };
    
    // Clear on initial load
    clearAllCaches();
    
    // Clear component data cache for custom API routes
    nuxtApp.hook('page:finish', () => {
      console.log('Page navigation detected, clearing content caches');
      clearAllCaches();
    });
    
    // Listen for storage events (if other tabs update content)
    window.addEventListener('storage', (event) => {
      if (event.key && (
        event.key.startsWith('content-') || 
        event.key.startsWith('nuxt-data-')
      )) {
        console.log('Storage change detected, reloading page');
        window.location.reload();
      }
    });
  }
});