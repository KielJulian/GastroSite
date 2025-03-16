import { defineNuxtPlugin } from '#app'

/**
 * This plugin provides a wrapper around the content module
 * to make it easier to use in composables
 */
export default defineNuxtPlugin(() => {
  // Create a wrapper function for content queries
  const $content = (path: string) => {
    // @ts-ignore - contentQuery is available at runtime
    return useContentQuery({
      path: path,
      find: true
    });
  };

  return {
    provide: {
      content: $content
    }
  }
});