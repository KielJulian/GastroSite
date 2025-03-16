// Handle content API requests through Nuxt Content
// This allows real-time content updates when used with Nuxt Studio
export default defineEventHandler(() => {
  // Let the content module handle requests directly
  return { success: true }
})