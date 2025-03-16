import { useAsyncData } from '#imports';

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
  
  /**
   * Get all menu categories
   */
  const getMenuCategories = async (): Promise<MenuCategory[]> => {
    try {
      console.log('Fetching menu categories');
      
      // Get the asyncData result
      const { data, error } = await useAsyncData(
        'raw-menu-categories',
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
        'raw-menu-tags',
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
      // Return empty array
      return [];
    }
  };
  
  /**
   * Get menu items with optional filtering
   */
  const getMenuItems = async (categoryId?: string, tagIds?: string[]): Promise<MenuItem[]> => {
    try {
      console.log('Fetching menu items', { categoryId, tagIds });
      
      // Get the asyncData result
      const { data, error } = await useAsyncData(
        'raw-menu-items',
        () => fetchContentMenuItems()
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
      
      // Get all items
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
      
      console.log('Menu items result:', items.length);
      // Sort by order
      return items.sort((a, b) => a.order - b.order);
    } catch (err) {
      console.error('Unexpected error in getMenuItems:', err);
      return [];
    }
  };
  
  /**
   * Get the latest lunch menu
   */
  const getLatestLunchMenu = async (): Promise<LunchMenu | null> => {
    try {
      const lunchMenus = await fetchLunchMenus();
      
      if (!lunchMenus || lunchMenus.length === 0) {
        console.error('No lunch menus found');
        return null;
      }
      
      // Get current date
      const today = new Date();
      
      // First try to find a menu that includes the current date
      for (const menu of lunchMenus) {
        const startDate = new Date(menu.startDate);
        const endDate = new Date(menu.endDate);
        
        if (today >= startDate && today <= endDate) {
          return menu;
        }
      }
      
      // If no current menu, return the most recent one
      // Sort by start date (descending)
      lunchMenus.sort((a, b) => {
        return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
      });
      
      return lunchMenus[0];
    } catch (error) {
      console.error('Error getting latest lunch menu:', error);
      return null;
    }
  };
  
  /**
   * Get team members
   */
  const getTeamMembers = async (limit?: number): Promise<TeamMember[]> => {
    try {
      console.log('Fetching team members');
      
      // Get the asyncData result
      const { data, error } = await useAsyncData(
        'raw-team-members',
        () => fetchTeamMembers()
      );
      
      // Handle errors and empty data
      if (error.value) {
        console.error('Error fetching team members:', error.value);
        return [];
      }
      
      if (!data.value) {
        console.warn('No team members found');
        return [];
      }
      
      // Get all members
      let members = data.value as TeamMember[];
      
      // Sort by order
      members = members.sort((a, b) => (a.order || 999) - (b.order || 999));
      
      // Limit if needed
      if (limit && limit > 0) {
        members = members.slice(0, limit);
      }
      
      console.log('Team members result:', members.length);
      return members;
    } catch (err) {
      console.error('Unexpected error in getTeamMembers:', err);
      return [];
    }
  };
  
  // Helper functions for content fetching
  
  // Helper to create a valid URL for both server and client side
  const createApiUrl = (path: string): string => {
    // Check if we're running on client or server
    if (typeof window !== 'undefined') {
      // Client-side - use relative URL
      return path;
    } else {
      // Server-side - use absolute URL with origin from runtime config
      try {
        const config = useRuntimeConfig();
        const baseUrl = config.public.apiBaseUrl || 'http://localhost:3000';
        return `${baseUrl}${path}`;
      } catch (err) {
        console.error('Error creating API URL:', err);
        return `http://localhost:3000${path}`;
      }
    }
  };
  
  const fetchContentCategories = async (): Promise<MenuCategory[]> => {
    try {
      // Try our custom endpoint first with proper URL resolution
      const apiUrl = createApiUrl('/api/content/menu/categories');
      console.log('Fetching categories from:', apiUrl);
      
      const result = await fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .catch(err => {
          console.error('Custom API failed:', err);
          // Return an empty array instead of trying another endpoint that might also fail
          return [];
        });

      console.log('Raw categories result:', result);
      
      // Handle different response formats
      if (result && result.success === false) {
        console.error('Error fetching categories:', result.error);
        return [];
      }
      
      if (result && Array.isArray(result) && result.length > 0 && result[0]?.categories) {
        return result[0].categories.map((category: any) => ({
          id: String(category.id || ''),
          name: String(category.name || ''),
          description: String(category.description || ''),
          order: Number(category.order || 0)
        }));
      }
      
      // Return empty array instead of hardcoded content
      console.warn('No valid categories data found, returning empty array');
      return [];
    } catch (err) {
      console.error('Error fetching categories content:', err);
      // Return empty array
      return [];
    }
  };
  
  const fetchContentTags = async (): Promise<MenuTag[]> => {
    try {
      // Try our custom endpoint with proper URL resolution
      const apiUrl = createApiUrl('/api/content/menu/tags');
      console.log('Fetching tags from:', apiUrl);
      
      const result = await fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .catch(err => {
          console.error('Custom API failed:', err);
          // Return an empty array instead of trying another endpoint that might also fail
          return [];
        });
        
      console.log('Raw tags result:', result);
      
      if (result && result.success === false) {
        console.error('Error fetching tags:', result.error);
        return [];
      }
      
      if (result && Array.isArray(result) && result.length > 0 && result[0]?.tags) {
        return result[0].tags.map((tag: any) => ({
          id: String(tag.id || ''),
          name: String(tag.name || ''),
          icon: String(tag.icon || '')
        }));
      }
      
      // Return empty array
      console.warn('No valid tags data found, returning empty array');
      return [];
    } catch (err) {
      console.error('Error fetching tags content:', err);
      // Return empty array
      return [];
    }
  };
  
  const fetchContentMenuItems = async (): Promise<MenuItem[]> => {
    try {
      // Try our custom endpoint with proper URL resolution
      const apiUrl = createApiUrl('/api/content/menu/items');
      console.log('Fetching menu items from:', apiUrl);
      
      const result = await fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .catch(err => {
          console.error('Custom API failed:', err);
          // Return an empty array instead of trying another endpoint that might also fail
          return [];
        });
        
      console.log('Raw menu items result:', result);
      
      if (result && result.success === false) {
        console.error('Error fetching menu items:', result.error);
        return [];
      }
      
      if (Array.isArray(result)) {
        return result.map((item: any) => ({
          _path: item._path || undefined,
          id: item._id || item.id || undefined,
          name: String(item.name || ''),
          description: String(item.description || ''),
          price: Number(item.price || 0),
          category: String(item.category || ''),
          tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
          image: item.image || undefined,
          order: Number(item.order || 0)
        }));
      }
      
      // Return empty array instead of hardcoded content
      console.warn('No valid menu items data found, returning empty array');
      return [];
    } catch (err) {
      console.error('Error fetching menu items content:', err);
      // Return empty array
      return [];
    }
  };
  
  const fetchContentLunchMenu = async (): Promise<LunchMenu | null> => {
    try {
      // Get the current date
      const now = new Date();
      const dateString = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      
      // Use proper URL resolution
      const apiUrl = createApiUrl('/api/content/lunch-menus');
      console.log('Fetching lunch menu from:', apiUrl);
      
      const result = await fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .catch(err => {
          console.error('Error fetching lunch menu:', err);
          return [];
        });
      
      console.log('Raw lunch menu result:', result);
      
      if (result && Array.isArray(result) && result.length > 0) {
        // Filter for current lunch menu
        const currentMenu = result.find(menu => 
          menu.startDate <= dateString && menu.endDate >= dateString
        );
        
        if (currentMenu) {
          console.log('Found current lunch menu:', currentMenu);
          return currentMenu;
        }
        
        // Return the most recent menu otherwise
        const sortedMenus = [...result].sort((a, b) => 
          new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        );
        
        if (sortedMenus.length > 0) {
          console.log('Found latest lunch menu:', sortedMenus[0]);
          return sortedMenus[0];
        }
      }
      
      return null;
    } catch (err) {
      console.error('Error fetching lunch menu content:', err);
      return null;
    }
  };
  
  const fetchTeamMembers = async (): Promise<TeamMember[]> => {
    try {
      // Try our custom endpoint with proper URL resolution
      const apiUrl = createApiUrl('/api/content/team');
      console.log('Fetching team members from:', apiUrl);
      
      const result = await fetch(apiUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
          }
          return response.json();
        })
        .catch(err => {
          console.error('Custom API failed:', err);
          return [];
        });
        
      console.log('Raw team members result:', result);
      
      if (result && result.success === false) {
        console.error('Error fetching team members:', result.error);
        return [];
      }
      
      if (Array.isArray(result)) {
        return result.map((member: any) => ({
          id: String(member.id || ''),
          name: String(member.name || ''),
          position: String(member.position || ''),
          bio: member.bio ? String(member.bio) : undefined,
          image: member.image ? String(member.image) : undefined,
          order: member.order ? Number(member.order) : undefined,
          socials: member.socials || {}
        }));
      }
      
      return [];
    } catch (err) {
      console.error('Error fetching team members content:', err);
      return [];
    }
  };
  
  const fetchLunchMenus = async (): Promise<LunchMenu[]> => {
    try {
      const response = await fetch('/api/content/lunch-menus');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch lunch menus: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching lunch menus:', error);
      return [];
    }
  };
  
  return {
    getMenuCategories,
    getMenuTags,
    getMenuItems,
    getLatestLunchMenu,
    getTeamMembers
  };
}; 