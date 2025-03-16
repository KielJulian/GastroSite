import { defineEventHandler, readBody, createError } from 'h3'

export default defineEventHandler(async (event) => {
  try {
    // Since there's no direct import for serverQueryContent,
    // we'll have to rely on the underlying Nuxt Content module to handle this
    // This file ensures the route exists for Vercel
    return { handled: true, message: 'Content API query handler exists' }
  } catch (error) {
    console.error('Error in content query API:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Error in content query API',
    })
  }
}) 