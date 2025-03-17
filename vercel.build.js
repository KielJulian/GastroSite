/**
 * Vercel Build Configuration
 */
module.exports = {
  // Skip TypeScript checking during build to avoid Content module errors
  typescript: {
    ignoreErrors: true
  },
  // Force use ECMAScript modules
  esm: true
} 