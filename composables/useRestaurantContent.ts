import { useAsyncData } from '#imports';
import { useContentHelper } from './useContentHelper';

// Define interfaces
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

interface LunchMenu {
  startDate: string;
  endDate: string;
  title: string;
  items: any[];
}

interface TeamMember {
  id?: string;
  name: string;
  position: string;
  bio?: string;
  image?: string;
  order?: number;
  socials?: Record<string, string>;
}

interface LunchMenuItem {
  day: string;
  name: string;
  description: string;
  price: number;
  order: number;
}

// Create the composable
export const useRestaurantContent = () => {
  // Get the content helper
  const contentHelper = useContentHelper();
  
  /**
   * Get all menu categories
   */
  const getMenuCategories = async (): Promise<MenuCategory[]> => {
    try {
      console.log('Fetching menu categories');
      
      // Get the asyncData result
      const { data, error } = await useAsyncData(
        'menu-categories',
        () => fetchContentCategories()
      );
      
      // Handle errors and empty data
      if (error.value) {
        console.error('Error fetching categories:', error.value);
        return [];
      }
      
      if (!data.value) {
        console.warn('No categories found, returning empty array');
        return [];
      }
      
      const result = data.value;
      console.log('Categories result:', result);
      return result;
    } catch (err) {
      console.error('Unexpected error in getMenuCategories:', err);
      // Return empty array instead of hardcoded values
      return [];
    }
  };
  
  /**
   * Get all menu tags
   */
  const getMenuTags = async (): Promise<MenuTag[]> => {
    try {
      console.log('Fetching menu tags');
      
      // Get the asyncData result
      const { data, error } = await useAsyncData(
        'menu-tags',
        () => fetchContentTags()
      );
      
      // Handle errors and empty data
      if (error.value) {
        console.error('Error fetching tags:', error.value);
        return [];
      }
      
      if (!data.value) {
        console.warn('No tags found, returning empty array');
        return [];
      }
      
      const result = data.value;
      console.log('Tags result:', result);
      return result;
    } catch (err) {
      console.error('Unexpected error in getMenuTags:', err);
      return [];
    }
  };
  
  /**
   * Get all menu items
   */
  const getMenuItems = async (): Promise<MenuItem[]> => {
    try {
      console.log('Fetching menu items');
      
      // Get the asyncData result
      const { data, error } = await useAsyncData(
        'menu-items',
        () => fetchContentItems()
      );
      
      // Handle errors and empty data
      if (error.value) {
        console.error('Error fetching menu items:', error.value);
        return [];
      }
      
      if (!data.value) {
        console.warn('No menu items found, returning empty array');
        return [];
      }
      
      const result = data.value;
      console.log('Menu items result:', result);
      return result;
    } catch (err) {
      console.error('Unexpected error in getMenuItems:', err);
      return [];
    }
  };
  
  /**
   * Get lunch menus
   */
  const getLunchMenus = async (): Promise<LunchMenu[]> => {
    try {
      console.log('Fetching lunch menus');
      
      // Get the asyncData result
      const { data, error } = await useAsyncData(
        'lunch-menus',
        () => fetchContentLunchMenus()
      );
      
      // Handle errors and empty data
      if (error.value) {
        console.error('Error fetching lunch menus:', error.value);
        return [];
      }
      
      if (!data.value) {
        console.warn('No lunch menus found, returning empty array');
        return [];
      }
      
      const result = data.value;
      console.log('Lunch menus result:', result);
      return result;
    } catch (err) {
      console.error('Unexpected error in getLunchMenus:', err);
      return [];
    }
  };
  
  /**
   * Get current lunch menu
   */
  const getCurrentLunchMenu = async (): Promise<LunchMenu | null> => {
    try {
      const lunchMenus = await getLunchMenus();
      
      if (!lunchMenus || lunchMenus.length === 0) {
        console.warn('No lunch menus available');
        return null;
      }
      
      // Find the current lunch menu based on date
      const today = new Date();
      const currentMenu = lunchMenus.find(menu => {
        const startDate = new Date(menu.startDate);
        const endDate = new Date(menu.endDate);
        return today >= startDate && today <= endDate;
      });
      
      if (currentMenu) {
        return currentMenu;
      }
      
      // If no current menu found, return the most recent one
      console.warn('No current lunch menu found, returning most recent');
      return lunchMenus[0];
    } catch (err) {
      console.error('Error getting current lunch menu:', err);
      return null;
    }
  };
  
  // Fetch categories using Nuxt Content
  const fetchContentCategories = async (): Promise<MenuCategory[]> => {
    try {
      console.log('Fetching categories using Nuxt Content');
      
      // Use content helper to get categories from the YAML file
      const categoriesDoc = await contentHelper.findOne('menu/categories/categories');
      
      console.log('Categories from Content:', categoriesDoc);
      
      if (categoriesDoc && categoriesDoc.categories && Array.isArray(categoriesDoc.categories)) {
        return categoriesDoc.categories.map((category: any) => ({
          id: String(category.id || ''),
          name: String(category.name || ''),
          description: String(category.description || ''),
          order: Number(category.order || 0)
        }));
      }
      
      // Return empty array if no categories found
      console.warn('No categories found in content');
      return [];
    } catch (err) {
      console.error('Error fetching categories from content:', err);
      return [];
    }
  };
  
  // Fetch tags using Nuxt Content
  const fetchContentTags = async (): Promise<MenuTag[]> => {
    try {
      console.log('Fetching tags using Nuxt Content');
      
      // Use content helper to get tags from the YAML file
      const tagsDoc = await contentHelper.findOne('menu/tags/tags');
      
      console.log('Tags from Content:', tagsDoc);
      
      if (tagsDoc && tagsDoc.tags && Array.isArray(tagsDoc.tags)) {
        return tagsDoc.tags.map((tag: any) => ({
          id: String(tag.id || ''),
          name: String(tag.name || ''),
          icon: String(tag.icon || '')
        }));
      }
      
      // Return empty array if no tags found
      console.warn('No tags found in content');
      return [];
    } catch (err) {
      console.error('Error fetching tags from content:', err);
      return [];
    }
  };
  
  // Fetch menu items using Nuxt Content
  const fetchContentItems = async (): Promise<MenuItem[]> => {
    try {
      console.log('Fetching menu items using Nuxt Content');
      
      // Use content helper to get all menu items
      const menuItems = await contentHelper.findAll('menu/items', {
        where: { _extension: 'md', _partial: false }
      });
      
      console.log('Menu items from Content:', menuItems);
      
      if (menuItems && Array.isArray(menuItems) && menuItems.length > 0) {
        return menuItems.map((item: any) => {
          // Extract the ID from the path
          const id = item._path?.split('/').pop() || '';
          
          return {
            _path: item._path,
            id,
            name: String(item.name || ''),
            description: String(item.description || ''),
            price: Number(item.price || 0),
            category: String(item.category || ''),
            tags: Array.isArray(item.tags) ? item.tags : (item.tags ? [item.tags] : []),
            image: String(item.image || ''),
            order: Number(item.order || 999)
          };
        }).sort((a: any, b: any) => (a.order || 999) - (b.order || 999));
      }
      
      // Return empty array if no menu items found
      console.warn('No menu items found in content');
      return [];
    } catch (err) {
      console.error('Error fetching menu items from content:', err);
      return [];
    }
  };
  
  // Fetch lunch menus using Nuxt Content
  const fetchContentLunchMenus = async (): Promise<LunchMenu[]> => {
    try {
      console.log('Fetching lunch menus using Nuxt Content');
      
      // Use content helper to get all lunch menus
      const lunchMenus = await contentHelper.findAll('lunch-menus', {
        where: { _extension: 'md' }
      });
      
      console.log('Lunch menus from Content:', lunchMenus);
      
      if (lunchMenus && Array.isArray(lunchMenus) && lunchMenus.length > 0) {
        return lunchMenus.map((menu: any) => {
          // Extract the ID from the path
          const id = menu._path?.split('/').pop() || '';
          
          return {
            id,
            title: String(menu.title || 'Lunch Menu'),
            startDate: String(menu.startDate || ''),
            endDate: String(menu.endDate || ''),
            items: Array.isArray(menu.items) ? menu.items : []
          };
        }).sort((a: any, b: any) => {
          const dateA = new Date(a.startDate || '1970-01-01');
          const dateB = new Date(b.startDate || '1970-01-01');
          return dateB.getTime() - dateA.getTime();
        });
      }
      
      // Return empty array if no lunch menus found
      console.warn('No lunch menus found in content');
      return [];
    } catch (err) {
      console.error('Error fetching lunch menus from content:', err);
      return [];
    }
  };
  
  return {
    getMenuCategories,
    getMenuTags,
    getMenuItems,
    getLunchMenus,
    getCurrentLunchMenu
  };
}; 