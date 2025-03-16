import { useAsyncData } from '#imports';

/**
 * Helper composable for working with Nuxt Content
 * This provides a consistent interface for content queries
 */
export const useContentHelper = () => {
  /**
   * Query content with proper error handling
   */
  const queryContent = async (path: string, options: any = {}) => {
    try {
      // Use the built-in content query composable
      const content = await useAsyncData(`content-${path}`, () => {
        // @ts-ignore - contentQuery is available at runtime
        return $fetch(`/api/_content/query`, {
          method: 'POST',
          body: {
            where: {
              _path: { $contains: path },
              ...options.where
            },
            ...options
          }
        });
      });
      
      if (content.error.value) {
        console.error(`Error querying content at ${path}:`, content.error.value);
        return [];
      }
      
      return content.data.value || [];
    } catch (err) {
      console.error(`Error in queryContent for ${path}:`, err);
      return [];
    }
  };
  
  /**
   * Find a single content item
   */
  const findOne = async (path: string, options: any = {}) => {
    const results = await queryContent(path, options);
    if (Array.isArray(results) && results.length > 0) {
      return results[0];
    }
    return null;
  };
  
  /**
   * Find all content items matching the query
   */
  const findAll = async (path: string, options: any = {}) => {
    const results = await queryContent(path, options);
    return Array.isArray(results) ? results : [];
  };
  
  return {
    queryContent,
    findOne,
    findAll
  };
}; 