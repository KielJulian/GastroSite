// Simple handler to ensure the API route exists for Vercel
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
  // Let the Nuxt Content module handle this
  return { success: true }
}) 