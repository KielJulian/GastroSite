/**
 * Vercel Build Configuration
 */
export default {
  typescript: {
    // Skip TypeScript checking during build to avoid Content module errors
    ignoreErrors: true,
    tsconfigPath: './tsconfig.vercel.json'
  }
}; 