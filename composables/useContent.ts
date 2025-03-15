import { useI18n } from 'vue-i18n';
import { useNuxtApp } from '#app';
import { useAsyncData } from '#app';

export const useRestaurantContent = () => {
  const { locale } = useI18n();
  const nuxtApp = useNuxtApp();

  /**
   * Get all menu categories sorted by order
   */
  const getMenuCategories = async () => {
    try {
      const localeStr = locale.value;
      const path = `/menu/categories/${localeStr}`;
      // Use $content() instead of queryContent
      const data = await useAsyncData(`menu-categories-${localeStr}`, () => {
        // @ts-ignore
        return $fetch(`/api/_content${path}`)
      });
      
      if (!data.data.value || !data.data.value.categories) {
        console.error(`No categories found at ${path}`);
        return [];
      }
      
      return [...data.data.value.categories].sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching menu categories:', error);
      return [];
    }
  };

  /**
   * Get all menu tags
   */
  const getMenuTags = async () => {
    try {
      const localeStr = locale.value;
      const path = `/menu/tags/${localeStr}`;
      const data = await useAsyncData(`menu-tags-${localeStr}`, () => {
        // @ts-ignore
        return $fetch(`/api/_content${path}`)
      });
      
      if (!data.data.value || !data.data.value.tags) {
        console.error(`No tags found at ${path}`);
        return [];
      }
      
      return data.data.value.tags;
    } catch (error) {
      console.error('Error fetching menu tags:', error);
      return [];
    }
  };

  /**
   * Get menu items filtered by category and/or tags
   */
  const getMenuItems = async (categoryId?: string, tagIds?: string[]) => {
    try {
      const path = '/menu/items';
      const data = await useAsyncData(`menu-items-${categoryId || 'all'}-${tagIds?.join('-') || 'all'}`, () => {
        // @ts-ignore
        return $fetch(`/api/_content${path}`)
      });
      
      if (!data.data.value) {
        console.error(`No menu items found at ${path}`);
        return [];
      }
      
      const items = data.data.value;
      
      // Filter by category if specified
      let filteredItems = categoryId
        ? items.filter(item => item.category === categoryId)
        : items;
      
      // Filter by tags if specified
      if (tagIds && tagIds.length > 0) {
        filteredItems = filteredItems.filter(item => 
          tagIds.every(tagId => item.tags && item.tags.includes(tagId))
        );
      }
      
      // Sort by order
      return filteredItems.sort((a, b) => {
        // Handle missing order values
        const orderA = a.order !== undefined ? a.order : Infinity;
        const orderB = b.order !== undefined ? b.order : Infinity;
        return orderA - orderB;
      });
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }
  };

  /**
   * Get the latest lunch menu
   */
  const getLatestLunchMenu = async () => {
    try {
      const path = '/lunch-menus';
      const data = await useAsyncData('latest-lunch-menu', () => {
        // @ts-ignore
        return $fetch(`/api/_content${path}`)
      });
      
      if (!data.data.value) {
        console.error(`No lunch menus found at ${path}`);
        return null;
      }
      
      const menus = data.data.value;
      
      if (!menus.length) {
        return null;
      }
      
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];
      
      // Find active menu (where currentDate is between startDate and endDate)
      let activeMenu = menus.find(menu => 
        menu.startDate <= currentDate && menu.endDate >= currentDate
      );
      
      // If no active menu, get the most recent one
      if (!activeMenu) {
        activeMenu = [...menus].sort((a, b) => 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        )[0];
      }
      
      return activeMenu;
    } catch (error) {
      console.error('Error fetching lunch menus:', error);
      return null;
    }
  };

  /**
   * Get all team members sorted by order
   */
  const getTeamMembers = async (limit?: number) => {
    try {
      const path = '/team';
      const data = await useAsyncData(`team-members-${limit || 'all'}`, () => {
        // @ts-ignore
        return $fetch(`/api/_content${path}`)
      });
      
      if (!data.data.value) {
        console.error(`No team members found at ${path}`);
        return [];
      }
      
      const members = data.data.value;
      
      // Sort by order
      let sortedMembers = [...members].sort((a, b) => {
        // Handle missing order values
        const orderA = a.order !== undefined ? a.order : Infinity;
        const orderB = b.order !== undefined ? b.order : Infinity;
        return orderA - orderB;
      });
      
      // Apply limit if specified
      if (limit && limit > 0) {
        sortedMembers = sortedMembers.slice(0, limit);
      }
      
      return sortedMembers;
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
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