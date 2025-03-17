declare module '@nuxt/content' {
  interface NuxtContentConfig {
    // Add content module options here
    documentDriven?: boolean;
    markdown?: any;
    highlight?: any;
    yaml?: any;
    csv?: any;
    navigation?: any;
    locales?: string[];
    defaultLocale?: string;
    sources?: any;
    ignores?: string[];
    [key: string]: any;
  }
}

// Extend the NuxtConfig interface to include content property
declare module 'nuxt/schema' {
  interface NuxtConfig {
    content?: any;
  }
} 