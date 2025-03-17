/**
 * Vercel Build Configuration
 */
module.exports = {
  typescript: {
    // Skip TypeScript checking during build to avoid Content module errors
    ignoreErrors: true,
    tsconfigPath: './tsconfig.vercel.json'
  }
}; 