export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  
  // Allow requests with a token or in development mode
  const isProduction = process.env.NODE_ENV === 'production'
  
  if (isProduction && !query.token) {
    return createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  
  try {
    // Use proper URL construction
    return await $fetch('/api/query', {
      query
    })
  } catch (error) {
    console.error('Content API error:', error)
    return createError({
      statusCode: 500,
      message: 'Internal Server Error'
    })
  }
})