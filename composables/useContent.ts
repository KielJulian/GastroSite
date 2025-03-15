// Simulated content data since we removed the i18n integration
// In a real production app, you'd want to use proper CMS integration

export const useRestaurantContent = () => {
  /**
   * Get all menu categories sorted by order
   */
  const getMenuCategories = async () => {
    // Return hardcoded menu categories
    return [
      { id: "pizza", name: "Pizza", description: "Our stone-baked pizzas", order: 1 },
      { id: "pasta", name: "Pasta", description: "Homemade pasta dishes", order: 2 },
      { id: "salads", name: "Salads", description: "Fresh seasonal salads", order: 3 },
      { id: "desserts", name: "Desserts", description: "Sweet treats", order: 4 }
    ];
  };

  /**
   * Get all menu tags
   */
  const getMenuTags = async () => {
    // Return hardcoded menu tags
    return [
      { id: "vegetarian", name: "Vegetarian", icon: "leaf" },
      { id: "vegan", name: "Vegan", icon: "plant" },
      { id: "spicy", name: "Spicy", icon: "fire" },
      { id: "gluten-free", name: "Gluten-Free", icon: "wheat-slash" }
    ];
  };

  /**
   * Get menu items filtered by category and/or tags
   */
  const getMenuItems = async (categoryId?: string, tagIds?: string[]) => {
    // Hardcoded menu items
    const menuItems = [
      {
        id: 'margherita',
        name: 'Margherita Pizza',
        description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
        price: 10.90,
        category: 'pizza',
        tags: ['vegetarian'],
        order: 1
      },
      {
        id: 'diavola',
        name: 'Diavola Pizza',
        description: 'Spicy pizza with tomato sauce, mozzarella, and spicy salami',
        price: 12.90,
        category: 'pizza',
        tags: ['spicy'],
        order: 2
      },
      {
        id: 'vegetariana',
        name: 'Vegetable Supreme Pizza',
        description: 'Loaded with fresh seasonal vegetables, mushrooms, and our signature tomato sauce',
        price: 11.90,
        category: 'pizza',
        tags: ['vegetarian', 'vegan'],
        order: 3
      },
      {
        id: 'carbonara',
        name: 'Spaghetti Carbonara',
        description: 'Classic Italian pasta with pancetta, egg, Pecorino Romano cheese and black pepper',
        price: 13.90,
        category: 'pasta',
        tags: [],
        order: 1
      },
      {
        id: 'bolognese',
        name: 'Tagliatelle Bolognese',
        description: 'Tagliatelle with rich meat ragù and parmesan',
        price: 14.90,
        category: 'pasta',
        tags: [],
        order: 2
      },
      {
        id: 'arrabbiata',
        name: 'Penne Arrabbiata',
        description: 'Penne with spicy tomato sauce and garlic',
        price: 12.90,
        category: 'pasta',
        tags: ['vegetarian', 'vegan', 'spicy'],
        order: 3
      },
      {
        id: 'caesar',
        name: 'Caesar Salad',
        description: 'Crisp romaine lettuce, croutons, Parmesan cheese, and our homemade Caesar dressing',
        price: 9.90,
        category: 'salads',
        tags: ['vegetarian'],
        order: 1
      },
      {
        id: 'greek',
        name: 'Greek Salad',
        description: 'Fresh salad with tomatoes, cucumber, feta cheese, and olives',
        price: 8.90,
        category: 'salads',
        tags: ['vegetarian', 'gluten-free'],
        order: 2
      },
      {
        id: 'tiramisu',
        name: 'Tiramisu',
        description: 'Traditional Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream',
        price: 6.90,
        category: 'desserts',
        tags: ['vegetarian'],
        order: 1
      },
      {
        id: 'pannacotta',
        name: 'Panna Cotta',
        description: 'Creamy vanilla dessert with berry sauce',
        price: 5.90,
        category: 'desserts',
        tags: ['vegetarian', 'gluten-free'],
        order: 2
      }
    ];
    
    // Filter by category if specified
    let filteredItems = menuItems;
    
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
  };

  /**
   * Get the latest lunch menu
   */
  const getLatestLunchMenu = async () => {
    // Return a hardcoded lunch menu
    return {
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
  };

  /**
   * Get all team members sorted by order
   */
  const getTeamMembers = async (limit?: number) => {
    // Hardcoded team members
    const teamMembers = [
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
    
    // Sort by order
    let sortedMembers = [...teamMembers].sort((a, b) => a.order - b.order);
    
    // Apply limit if specified
    if (limit && limit > 0) {
      sortedMembers = sortedMembers.slice(0, limit);
    }
    
    return sortedMembers;
  };

  /**
   * Update the order of items in a collection
   * This is now a stub function since we've hardcoded content data
   */
  const updateContentOrder = async (
    collection: string, 
    items: Array<{ _id: string; order: number }>
  ) => {
    // Just log the request since we no longer need CMS integration
    console.log(`Update order for ${collection} requested (hardcoded data)`, items);
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