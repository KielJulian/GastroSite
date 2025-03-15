export default defineEventHandler((event) => {
  const query = getQuery(event)
  
  // This endpoint should only be used by Nuxt Studio
  if (!isProduction || !query.token) {
    return createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }
  
  // Validate the token here if necessary
  
  return $fetch('/_content/query', {
    baseURL: event.node.req.url,
    params: query
  })
})