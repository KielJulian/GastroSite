import { useRuntimeConfig } from '#app';
import { useAsyncData } from '#imports';

// Simple declaration for queryContent
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
      console.log('Fetching menu categories...');
      // Create unique key to prevent caching
      const timestamp = Date.now();
      const uniqueKey = `menu-categories-${timestamp}`;
      
      const { data } = await useAsyncData(uniqueKey, async () => {
        const result = await queryContent('menu/categories')
          .find();
        console.log('Categories query result:', result);
        
        // Handle the array safely
        if (result && Array.isArray(result) && result.length > 0) {
          if (result[0].categories) {
            console.log('Found categories array in YAML');
            return result[0].categories;
          }
          return result;
        }
        return [];
      }, { 
        server: true, // Enable server-side rendering
      });
      
      if (!data.value) {
        console.warn('No categories data found');
        return [];
      }
      
      return data.value;
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
      console.log('Fetching menu tags...');
      // Create unique key to prevent caching
      const timestamp = Date.now();
      const uniqueKey = `menu-tags-${timestamp}`;
      
      const { data } = await useAsyncData(uniqueKey, async () => {
        const result = await queryContent('menu/tags')
          .find();
        console.log('Tags query result:', result);
        
        // Handle the array safely
        if (result && Array.isArray(result) && result.length > 0) {
          if (result[0].tags) {
            console.log('Found tags array in YAML');
            return result[0].tags;
          }
          return result;
        }
        return [];
      }, { 
        server: true, // Enable server-side rendering
      });
      
      if (!data.value) {
        console.warn('No tags data found');
        return [];
      }
      
      return data.value;
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
      console.log('Fetching menu items, category:', categoryId, 'tags:', tagIds);
      
      // Create a unique cache key with timestamp to prevent caching
      const timestamp = Date.now();
      const cacheKey = categoryId 
        ? `menu-items-${categoryId}-${timestamp}` 
        : `menu-items-all-${timestamp}`;
      
      // Add debugging
      console.log('Query path:', 'menu/items');
      
      const { data } = await useAsyncData(cacheKey, 
        async () => {
          try {
            // Direct query without composable layer
            const result = await queryContent('menu/items').find();
            console.log('Menu items query result:', result);
            return result;
          } catch (queryError) {
            console.error('Error in content query:', queryError);
            throw queryError;
          }
        },
        { 
          server: true, // Enable server-side rendering
          immediate: true
        }
      );
      
      if (!data.value) {
        console.warn('No menu items data returned');
        return [];
      }
      
      console.log('Menu items raw data:', data.value);
      
      // Filter and process the items
      let items = data.value as MenuItem[];
      
      // Filter by category if specified
      if (categoryId) {
        console.log('Filtering by category:', categoryId);
        items = items.filter(item => item.category === categoryId);
        console.log('After category filter:', items.length, 'items');
      }
      
      // Filter by tags if specified
      if (tagIds && tagIds.length > 0) {
        console.log('Filtering by tags:', tagIds);
        items = items.filter(item => 
          tagIds.every(tagId => item.tags && item.tags.includes(tagId))
        );
        console.log('After tag filter:', items.length, 'items');
      }
      
      // Sort by order
      const sortedItems = items.sort((a, b) => a.order - b.order);
      console.log('Returning', sortedItems.length, 'sorted menu items');
      return sortedItems;
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
      console.log('Fetching latest lunch menu...');
      // Get the current date
      const now = new Date();
      const dateString = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      console.log('Current date for lunch menu:', dateString);
      
      // Create unique key to prevent caching
      const timestamp = Date.now();
      const uniqueKey = `latest-lunch-menu-${timestamp}`;
      
      // Find lunch menus that are active now (where startDate <= now <= endDate)
      const { data } = await useAsyncData(uniqueKey, async () => {
        const result = await queryContent('lunch-menus')
          .where({ startDate: { $lte: dateString } })
          .where({ endDate: { $gte: dateString } })
          .sort({ startDate: -1 }) // Get the most recent one if there are multiple
          .limit(1)
          .find();
          
        console.log('Lunch menu query result:', result);
        return result;
      }, { server: true });
      
      if (!data.value || !Array.isArray(data.value) || data.value.length === 0) {
        console.log('No current lunch menu found, looking for the newest one...');
        // If no current menu found, get the newest one
        const futureKey = `future-lunch-menu-${timestamp}`;
        const { data: latestData } = await useAsyncData(futureKey, async () => {
          const result = await queryContent('lunch-menus')
            .sort({ startDate: -1 })
            .limit(1)
            .find();
            
          console.log('Future lunch menu query result:', result);
          return result;
        }, { server: true });
        
        if (latestData.value && Array.isArray(latestData.value) && latestData.value.length > 0) {
          console.log('Found future lunch menu:', latestData.value[0]);
          return latestData.value[0];
        }
        
        console.log('No lunch menu found at all');
        return null;
      }
      
      if (data.value && Array.isArray(data.value) && data.value.length > 0) {
        console.log('Found current lunch menu:', data.value[0]);
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
        server: true, // Enable server-side rendering
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