import { useNuxtApp } from '#app';

export const useRestaurantContent = () => {
  const { $content } = useNuxtApp();
  const { locale } = useI18n();

  /**
   * Get all menu categories sorted by order
   */
  const getMenuCategories = async () => {
    const localeStr = locale.value;
    const { data } = await useAsyncData(`menu-categories-${localeStr}`, () => 
      queryContent(`/menu/categories/${localeStr}`).findOne()
    );
    
    if (!data.value || !data.value.categories) {
      return [];
    }
    
    return [...data.value.categories].sort((a, b) => a.order - b.order);
  };

  /**
   * Get all menu tags
   */
  const getMenuTags = async () => {
    const localeStr = locale.value;
    const { data } = await useAsyncData(`menu-tags-${localeStr}`, () => 
      queryContent(`/menu/tags/${localeStr}`).findOne()
    );
    
    if (!data.value || !data.value.tags) {
      return [];
    }
    
    return data.value.tags;
  };

  /**
   * Get menu items filtered by category and/or tags
   */
  const getMenuItems = async (categoryId?: string, tagIds?: string[]) => {
    let query = queryContent('/menu/items');
    
    if (categoryId) {
      query = query.where({ category: categoryId });
    }
    
    const { data } = await useAsyncData(`menu-items-${categoryId}-${tagIds?.join('-')}`, () => 
      query.find()
    );
    
    if (!data.value) {
      return [];
    }
    
    let items = [...data.value].sort((a, b) => a.order - b.order);
    
    // Filter by tags if specified
    if (tagIds && tagIds.length > 0) {
      items = items.filter(item => 
        tagIds.every(tagId => item.tags && item.tags.includes(tagId))
      );
    }
    
    return items;
  };

  /**
   * Get the latest lunch menu
   */
  const getLatestLunchMenu = async () => {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    
    // Simple query without operators to avoid TypeScript errors
    const { data } = await useAsyncData('latest-lunch-menu', () => 
      queryContent('/lunch-menus')
        .find()
    );
    
    // Manual filtering in JavaScript
    let activeMenu = null;
    if (data.value && data.value.length > 0) {
      activeMenu = data.value.find(menu => 
        menu.startDate <= currentDate && menu.endDate >= currentDate
      );
      
      // If no active menu, get the most recent one
      if (!activeMenu) {
        activeMenu = [...data.value].sort((a, b) => 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        )[0];
      }
    }
    
    return activeMenu;
  };

  /**
   * Get all team members sorted by order
   */
  const getTeamMembers = async (limit?: number) => {
    const { data } = await useAsyncData(`team-members-${limit}`, () => 
      queryContent('/team').find()
    );
    
    if (!data.value) {
      return [];
    }
    
    let members = [...data.value].sort((a, b) => a.order - b.order);
    
    if (limit && limit > 0) {
      members = members.slice(0, limit);
    }
    
    return members;
  };

  /**
   * Update the order of items in a collection
   */
  const updateContentOrder = async (
    collection: string, 
    items: Array<{ _id: string; order: number }>
  ) => {
    // This would connect to your API to update the order in the CMS
    // Implementation depends on your backend setup
    console.log(`Updating order for ${collection}`, items);
    
    // In a real app, you would update the order in the CMS
    // Example implementation:
    /*
    await $fetch('/api/content/update-order', {
      method: 'POST',
      body: {
        collection,
        items
      }
    });
    */
  };

  return {
    getMenuCategories,
    getMenuTags,
    getMenuItems,
    getLatestLunchMenu,
    getTeamMembers,
    updateContentOrder
  };
};