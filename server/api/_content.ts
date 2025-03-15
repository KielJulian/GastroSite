// This file used to be managed by @nuxthq/studio module
// Now it just returns empty content since we're using queryContent
export default defineEventHandler(() => {
  return { handled: 'by content module directly' }
})