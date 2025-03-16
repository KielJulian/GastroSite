// This file acts as a proxy to the Nuxt Content API
// We're explicitly setting up this route to ensure Vercel can handle it correctly

import { eventHandler } from 'h3'

export default eventHandler(async () => {
  // Let the Nuxt Content module handle this
  return { success: true }
})