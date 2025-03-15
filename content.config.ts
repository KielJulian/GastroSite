// https://content.nuxt.com/get-started/configuration
export default defineContentConfig({
  documentDriven: true,
  navigation: {
    fields: ['_id', 'title', 'description', '_path']
  },
  highlight: {
    theme: 'github-light',
    preload: ['json', 'js', 'ts', 'html', 'css', 'vue']
  }
})