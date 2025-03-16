import { useRuntimeConfig } from '#app';
import { useAsyncData } from '#imports';
// When using Nuxt Content, queryContent is available globally
// Define it for TypeScript
declare const queryContent: any;

interface MenuCategory {
  id: string;
  name: string;
  description: string;
  order: number;
}

interface MenuTag {
  id: string;
  name: string;
  icon: string;
}

interface MenuItem {
  _path?: string;
  id?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  image?: string;
  order: number;
}

interface TeamMember {
  _path?: string;
  id?: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  order: number;
}

interface LunchMenuItem {
  day: string;
  name: string;
  description: string;
  price: number;
  order: number;
}

interface LunchMenu {
  startDate: string;
  endDate: string;
  title: string;
  items: LunchMenuItem[];
}

export const useRestaurantContent = () => {
  const config = useRuntimeConfig();
  
  /**
   * Get all menu categories sorted by order
   */
  const getMenuCategories = async (): Promise<MenuCategory[]> => {
    try {
      const { data } = await useAsyncData('menu-categories', () => {
        return queryContent('menu/categories')
          .where({ _locale: { $eq: 'en' } })
          .find();
      }, { server: false });
      
      // Handle the array safely
      if (data.value && Array.isArray(data.value) && data.value.length > 0) {
        return data.value[0].categories || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching menu categories:', error);
      return [];
    }
  };

  /**
   * Get all menu tags
   */
  const getMenuTags = async (): Promise<MenuTag[]> => {
    try {
      const { data } = await useAsyncData('menu-tags', () => {
        return queryContent('menu/tags')
          .where({ _locale: { $eq: 'en' } })
          .find();
      }, { server: false });
      
      // Handle the array safely
      if (data.value && Array.isArray(data.value) && data.value.length > 0) {
        return data.value[0].tags || [];
      }
      return [];
    } catch (error) {
      console.error('Error fetching menu tags:', error);
      return [];
    }
  };

  /**
   * Get menu items filtered by category and/or tags
   */
  const getMenuItems = async (categoryId?: string, tagIds?: string[]): Promise<MenuItem[]> => {
    try {
      // Create a query for the menu items
      let query = queryContent('menu/items');
      
      // Get all menu items
      const cacheKey = categoryId ? ("menu-items-" + categoryId) : 'menu-items-all';
      const { data } = await useAsyncData(cacheKey, 
        () => query.find(),
        { server: false }
      );
      
      if (!data.value) return [];
      
      // Filter and process the items
      let items = data.value as MenuItem[];
      
      // Filter by category if specified
      if (categoryId) {
        items = items.filter(item => item.category === categoryId);
      }
      
      // Filter by tags if specified
      if (tagIds && tagIds.length > 0) {
        items = items.filter(item => 
          tagIds.every(tagId => item.tags && item.tags.includes(tagId))
        );
      }
      
      // Sort by order
      return items.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      return [];
    }
  };

  /**
   * Get the latest lunch menu
   */
  const getLatestLunchMenu = async (): Promise<LunchMenu | null> => {
    try {
      // Get the current date
      const now = new Date();
      const dateString = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      
      // Find lunch menus that are active now (where startDate <= now <= endDate)
      const { data } = await useAsyncData('latest-lunch-menu', () => {
        return queryContent('lunch-menus')
          .where({ startDate: { $lte: dateString } })
          .where({ endDate: { $gte: dateString } })
          .sort({ startDate: -1 }) // Get the most recent one if there are multiple
          .limit(1)
          .find();
      }, { server: false });
      
      if (!data.value || !Array.isArray(data.value) || data.value.length === 0) {
        // If no current menu found, get the newest one
        const { data: latestData } = await useAsyncData('future-lunch-menu', () => {
          return queryContent('lunch-menus')
            .sort({ startDate: -1 })
            .limit(1)
            .find();
        }, { server: false });
        
        if (latestData.value && Array.isArray(latestData.value) && latestData.value.length > 0) {
          return latestData.value[0];
        }
        return null;
      }
      
      if (data.value && Array.isArray(data.value) && data.value.length > 0) {
        return data.value[0];
      }
      return null;
    } catch (error) {
      console.error('Error fetching latest lunch menu:', error);
      return null;
    }
  };

  /**
   * Get all team members sorted by order
   */
  const getTeamMembers = async (limit?: number): Promise<TeamMember[]> => {
    try {
      // Reset content cache before fetching to ensure fresh data
      // Create a unique key based on the timestamp
      const timestamp = Date.now();
      const uniqueKey = "team-members-" + timestamp;
      const { data } = await useAsyncData(uniqueKey, () => {
        return queryContent('team')
          .where({ _partial: { $ne: true } }) // Skip partial content like _template.md
          .find();
      }, { 
        server: false,
        // Important for dynamic updates: don't cache the results
        immediate: true,
        // No watch needed, we're using a unique key for each call
      });
      
      if (!data.value) return [];
      
      // Sort by order and apply limit if needed
      let members: TeamMember[] = [];
      
      if (data.value && Array.isArray(data.value)) {
        members = [...data.value].sort((a, b) => a.order - b.order);
      }
      
      if (limit && limit > 0) {
        members = members.slice(0, limit);
      }
      
      return members;
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  };

  /**
   * Update the order of items in a collection
   * This is a stub function
   */
  const updateContentOrder = async (
    collection: string, 
    items: Array<{ _id: string; order: number }>
  ): Promise<void> => {
    console.log("Update order for " + collection + " requested (not implemented)", items);
    // In a real application, this would update the order in the CMS
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