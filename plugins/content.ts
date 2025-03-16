import { defineNuxtPlugin } from '#app'

// This plugin ensures that the content module is properly initialized
export default defineNuxtPlugin((nuxtApp) => {
  // Make sure queryContent is globally available
  console.log('Registering content plugin');
  
  // Provide a global access to content for debugging
  const $content = (path?: string) => {
    // Wrap the global queryContent function with error handling
    try {
      // @ts-ignore - queryContent is globally available at runtime
      return queryContent(path || '/');
    } catch (error) {
      console.error('Error accessing queryContent:', error);
      throw error;
    }
  };
  
  // Register the content helper
  nuxtApp.provide('content', $content);
})