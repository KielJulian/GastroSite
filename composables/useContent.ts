import { useNuxtApp } from '#app';
import { useAsyncData } from '#app';

export const useRestaurantContent = () => {
  const nuxtApp = useNuxtApp();

  /**
   * Get all menu categories sorted by order
   */
  const getMenuCategories = async () => {
    try {
      const path = `/menu/categories`;
      const data = await useAsyncData(`menu-categories`, () => {
        // @ts-ignore
        return $fetch(`/api/_content${path}`)
      });
      
      if (!data.data.value) {
        console.error(`No categories found at ${path}`);
        return [];
      }
      
      // Simplified since we removed i18n
      return data.data.value;
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
      const path = `/menu/tags`;
      const data = await useAsyncData(`menu-tags`, () => {
        // @ts-ignore
        return $fetch(`/api/_content${path}`)
      });
      
      if (!data.data.value) {
        console.error(`No tags found at ${path}`);
        return [];
      }
      
      return data.data.value;
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
      
      // Simplified since we removed i18n
      return data.data.value;
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
      
      // Simplified since we removed i18n
      return data.data.value;
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
      
      // Simplified since we removed i18n
      return data.data.value;
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