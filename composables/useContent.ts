// Direct import from CMS files to fix build issues

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
  // Hardcoded data from CMS files
  const menuCategories: MenuCategory[] = [
    { id: "pizza", name: "Pizza", description: "Our stone-baked pizzas", order: 1 },
    { id: "pasta", name: "Pasta", description: "Homemade pasta dishes", order: 2 },
    { id: "salads", name: "Salads", description: "Fresh seasonal salads", order: 3 },
    { id: "desserts", name: "Desserts", description: "Sweet treats", order: 4 }
  ];

  const menuTags: MenuTag[] = [
    { id: "vegetarian", name: "Vegetarian", icon: "leaf" },
    { id: "vegan", name: "Vegan", icon: "plant" },
    { id: "spicy", name: "Spicy", icon: "fire" },
    { id: "gluten-free", name: "Gluten-Free", icon: "wheat-slash" }
  ];

  const menuItems: MenuItem[] = [
    {
      id: 'margherita-pizza',
      name: 'Margherita Pizza',
      description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
      price: 13.4,
      category: 'pizza',
      tags: ['vegetarian'],
      image: '/images/menu/margherita-pizza.jpg',
      order: 1
    },
    {
      id: 'veggie-pizza',
      name: 'Vegetable Supreme Pizza',
      description: 'Loaded with fresh seasonal vegetables, mushrooms, and our signature tomato sauce',
      price: 14.9,
      category: 'pizza',
      tags: ['vegetarian', 'vegan'],
      image: '/images/menu/veggie-pizza.jpg',
      order: 2
    },
    {
      id: 'carbonara-pasta',
      name: 'Carbonara Pasta',
      description: 'Classic Italian pasta with pancetta, egg, pecorino romano, and black pepper',
      price: 12.9,
      category: 'pasta',
      tags: [],
      order: 1
    },
    {
      id: 'caesar-salad',
      name: 'Caesar Salad',
      description: 'Romaine lettuce with Caesar dressing, croutons, and parmesan cheese',
      price: 9.9,
      category: 'salads',
      tags: ['vegetarian'],
      order: 1
    },
    {
      id: 'tiramisu',
      name: 'Tiramisu',
      description: 'Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
      price: 6.9,
      category: 'desserts',
      tags: ['vegetarian'],
      order: 1
    }
  ];  

  const teamMembers: TeamMember[] = [
    {
      id: 'jane-doe',
      name: 'Jane Doe',
      position: 'Head Chef',
      bio: 'Jane has 15 years of experience in the culinary world, specializing in Italian cuisine. She has worked in Michelin-starred restaurants across Europe before joining our team.',
      image: '/images/team/jane-doe.jpg',
      order: 1
    },
    {
      id: 'john-smith',
      name: 'John Smith',
      position: 'Sous Chef',
      bio: 'John trained at the Culinary Institute of America and specializes in modern European cuisine. He brings creative flair to our seasonal menu items.',
      image: '/images/team/john-smith.jpg',
      order: 2
    },
    {
      id: 'maria-garcia',
      name: 'Maria Garcia',
      position: 'Pastry Chef',
      bio: 'Maria is a master of sweet creations with a background in French pastry. Her desserts combine traditional techniques with innovative flavor combinations.',
      image: '/images/team/maria-garcia.jpg',
      order: 3
    },
    {
      id: 'thomas-mueller',
      name: 'Thomas Müller',
      position: 'Restaurant Manager',
      bio: 'Thomas has a degree in hospitality management and oversees all operations of the restaurant. He ensures that every guest has an exceptional dining experience.',
      image: '/images/team/thomas-mueller.jpg',
      order: 4
    },
    {
      id: 'sophia-chen',
      name: 'Sophia Chen',
      position: 'Sommelier',
      bio: 'Sophia is our wine expert with certification from the Court of Master Sommeliers. She has curated our wine selection to perfectly complement our menu.',
      image: '/images/team/sophia-chen.jpg',
      order: 5
    }
  ];

  const lunchMenu: LunchMenu = {
    startDate: "2025-03-18",
    endDate: "2025-03-22",
    title: "Spring Special Week",
    items: [
      {
        day: "Monday",
        name: "Mushroom Risotto",
        description: "Creamy arborio rice with seasonal mushrooms",
        price: 9.90,
        order: 1
      },
      {
        day: "Monday",
        name: "Tomato Soup",
        description: "Classic tomato soup with basil and croutons",
        price: 6.90,
        order: 2
      },
      {
        day: "Tuesday",
        name: "Chicken Curry",
        description: "Tender chicken pieces in a mild curry sauce with rice",
        price: 10.90,
        order: 1
      },
      {
        day: "Tuesday",
        name: "Vegetable Quiche",
        description: "Homemade quiche with seasonal vegetables and a side salad",
        price: 8.90,
        order: 2
      },
      {
        day: "Wednesday",
        name: "Beef Goulash",
        description: "Slow-cooked beef goulash with potatoes and vegetables",
        price: 11.90,
        order: 1
      },
      {
        day: "Wednesday",
        name: "Stuffed Bell Peppers",
        description: "Bell peppers stuffed with rice, vegetables, and feta cheese",
        price: 9.90,
        order: 2
      },
      {
        day: "Thursday",
        name: "Fish & Chips",
        description: "Crispy fried fish with potato wedges and homemade tartar sauce",
        price: 12.90,
        order: 1
      },
      {
        day: "Thursday",
        name: "Pasta Primavera",
        description: "Penne with spring vegetables in a light cream sauce",
        price: 8.90,
        order: 2
      },
      {
        day: "Friday",
        name: "Wiener Schnitzel",
        description: "Traditional breaded veal schnitzel with potato salad",
        price: 13.90,
        order: 1
      },
      {
        day: "Friday",
        name: "Spinach Lasagna",
        description: "Homemade lasagna with spinach, ricotta, and tomato sauce",
        price: 9.90,
        order: 2
      }
    ]
  };

  /**
   * Get all menu categories sorted by order
   */
  const getMenuCategories = async (): Promise<MenuCategory[]> => {
    try {
      // Return the hardcoded data for now
      return menuCategories;
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
      // Return the hardcoded data for now
      return menuTags;
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
      // Filter items based on parameters
      let filteredItems = [...menuItems];
      
      // Filter by category if specified
      if (categoryId) {
        filteredItems = filteredItems.filter(item => item.category === categoryId);
      }
      
      // Filter by tags if specified
      if (tagIds && tagIds.length > 0) {
        filteredItems = filteredItems.filter(item => 
          tagIds.every(tagId => item.tags && item.tags.includes(tagId))
        );
      }
      
      // Sort by order
      return filteredItems.sort((a, b) => a.order - b.order);
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
      // Return the hardcoded lunch menu
      return lunchMenu;
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
      // Sort by order
      let sortedMembers = [...teamMembers].sort((a, b) => a.order - b.order);
      
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
   * This is a stub function
   */
  const updateContentOrder = async (
    collection: string, 
    items: Array<{ _id: string; order: number }>
  ): Promise<void> => {
    console.log(`Update order for ${collection} requested (not implemented)`, items);
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