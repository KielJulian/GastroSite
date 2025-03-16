export default defineEventHandler(async (event) => {
  try {
    // Test the menu items endpoint
    const itemsResponse = await $fetch('/api/content/menu/items');
    
    // Test the categories endpoint
    const categoriesResponse = await $fetch('/api/content/menu/categories');
    
    // Test the tags endpoint
    const tagsResponse = await $fetch('/api/content/menu/tags');
    
    // Return all the results for debugging
    return {
      success: true,
      details: {
        items: {
          count: Array.isArray(itemsResponse) ? itemsResponse.length : 'not an array',
          data: itemsResponse
        },
        categories: {
          count: Array.isArray(categoriesResponse) ? categoriesResponse.length : 'not an array',
          data: categoriesResponse
        },
        tags: {
          count: Array.isArray(tagsResponse) ? tagsResponse.length : 'not an array',
          data: tagsResponse
        }
      }
    };
  } catch (error: any) {
    console.error('Error in menu-check:', error);
    return {
      success: false,
      error: error.message || 'Unknown error',
      stack: error.stack
    };
  }
}); 