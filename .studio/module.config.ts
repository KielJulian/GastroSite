export default defineNuxtModule({
  meta: {
    name: 'studio-config',
    configKey: 'studio'
  },
  defaults: {
    // your module defaults
  },
  setup (options, nuxt) {
    // Setup Nuxt Studio integration
    nuxt.hook('content:context', (context) => {
      // Add custom content transformers if needed
    })
  }
})