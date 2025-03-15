<template>
  <NuxtLayout name="default">
    <div>
    <!-- Hero Section -->
    <section class="hero menu-hero">
      <div class="container">
        <div class="hero-content">
          <h1>Our Menu</h1>
          <p>Discover our culinary creations made with fresh, locally-sourced ingredients</p>
        </div>
      </div>
    </section>

    <!-- Lunch Menu Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">Lunch Specials</h2>
        <p class="section-description text-center">Available Monday to Friday from 11:30 to 14:30</p>
        
        <!-- Hardcoded lunch menu preview -->
        <div class="lunch-menu">
          <div class="lunch-menu-header">
            <h3 class="lunch-menu-title">Spring Special Week</h3>
            <p class="lunch-menu-dates">18.03.2025 - 22.03.2025</p>
          </div>
          
          <div class="lunch-menu-days full-page">
            <div class="lunch-menu-day">
              <h4 class="day-title">Monday</h4>
              <div class="day-items">
                <div class="lunch-menu-item">
                  <div class="item-header">
                    <h5 class="item-name">Mushroom Risotto</h5>
                    <span class="item-price">€9.90</span>
                  </div>
                  <p class="item-description">
                    Creamy arborio rice with seasonal mushrooms
                  </p>
                </div>
                <div class="lunch-menu-item">
                  <div class="item-header">
                    <h5 class="item-name">Tomato Soup</h5>
                    <span class="item-price">€6.90</span>
                  </div>
                  <p class="item-description">
                    Classic tomato soup with basil and croutons
                  </p>
                </div>
              </div>
            </div>
            
            <div class="lunch-menu-day">
              <h4 class="day-title">Tuesday</h4>
              <div class="day-items">
                <div class="lunch-menu-item">
                  <div class="item-header">
                    <h5 class="item-name">Chicken Curry</h5>
                    <span class="item-price">€10.90</span>
                  </div>
                  <p class="item-description">
                    Tender chicken pieces in a mild curry sauce with rice
                  </p>
                </div>
                <div class="lunch-menu-item">
                  <div class="item-header">
                    <h5 class="item-name">Vegetable Quiche</h5>
                    <span class="item-price">€8.90</span>
                  </div>
                  <p class="item-description">
                    Homemade quiche with seasonal vegetables and a side salad
                  </p>
                </div>
              </div>
            </div>
            
            <!-- Additional days would go here -->
          </div>
        </div>
      </div>
    </section>

    <!-- Menu Categories Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">À La Carte Menu</h2>
        <p class="section-description text-center">Our regular menu is available daily from 17:00 to 22:00</p>
        
        <!-- Menu filters -->
        <div class="menu-filters">
          <div class="tag-filters">
            <span>Dietary Preferences:</span>
            <button 
              v-for="tag in tags" 
              :key="tag.id" 
              @click="toggleTagFilter(tag.id)"
              :class="['tag-filter', { active: activeTagFilters.includes(tag.id) }]">
              {{ tag.name }}
            </button>
          </div>
        </div>

        <!-- Menu categories -->
        <div v-for="category in sortedCategories" :key="category.id" class="menu-category">
          <h3 class="category-title">{{ category.name }}</h3>
          <p class="category-description">{{ category.description }}</p>
          
          <div class="menu-items grid grid-2">
            <div 
              v-for="item in getFilteredItemsByCategory(category.id)" 
              :key="item.id" 
              class="menu-item">
              <div class="menu-item-header">
                <h4 class="menu-item-name">{{ item.name }}</h4>
                <span class="menu-item-price">€{{ item.price.toFixed(2) }}</span>
              </div>
              <p class="menu-item-description">{{ item.description }}</p>
              <div class="menu-item-tags">
                <span v-for="tagId in item.tags" :key="tagId" class="menu-item-tag">
                  {{ getTagName(tagId) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { ref, computed } from 'vue';

// Type definitions without i18n content
const categories = ref([
  { id: 'pizza', name: 'Pizza', description: 'Our stone-baked pizzas', order: 1 },
  { id: 'pasta', name: 'Pasta', description: 'Homemade pasta dishes', order: 2 },
  { id: 'salads', name: 'Salads', description: 'Fresh seasonal salads', order: 3 },
  { id: 'desserts', name: 'Desserts', description: 'Sweet treats', order: 4 }
]);

const tags = ref([
  { id: 'vegetarian', name: 'Vegetarian', icon: 'leaf' },
  { id: 'vegan', name: 'Vegan', icon: 'plant' },
  { id: 'spicy', name: 'Spicy', icon: 'fire' },
  { id: 'gluten-free', name: 'Gluten-Free', icon: 'wheat-slash' }
]);

const menuItems = ref([
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
    name: 'Vegetariana Pizza',
    description: 'Veggie pizza with tomato sauce, mozzarella, and seasonal vegetables',
    price: 11.90,
    category: 'pizza',
    tags: ['vegetarian', 'vegan'],
    order: 3
  },
  {
    id: 'carbonara',
    name: 'Spaghetti Carbonara',
    description: 'Spaghetti with creamy egg sauce, pancetta, and pecorino cheese',
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
    description: 'Romaine lettuce with Caesar dressing, croutons, and parmesan',
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
    description: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
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
  },
]);

const activeTagFilters = ref([]);

// Sort categories by order
const sortedCategories = computed(() => {
  return [...categories.value].sort((a, b) => a.order - b.order);
});

// Get items for a specific category
const getFilteredItemsByCategory = (categoryId) => {
  let items = menuItems.value
    .filter(item => item.category === categoryId)
    .sort((a, b) => a.order - b.order);
  
  // Apply tag filters if any are active
  if (activeTagFilters.value.length > 0) {
    items = items.filter(item => 
      activeTagFilters.value.every(tagId => item.tags.includes(tagId))
    );
  }
  
  return items;
};

// Toggle tag filter
const toggleTagFilter = (tagId) => {
  const index = activeTagFilters.value.indexOf(tagId);
  if (index === -1) {
    activeTagFilters.value.push(tagId);
  } else {
    activeTagFilters.value.splice(index, 1);
  }
};

// Get tag name by ID
const getTagName = (tagId) => {
  const tag = tags.value.find(tag => tag.id === tagId);
  return tag ? tag.name : '';
};
</script>

<style scoped>
.menu-hero {
  height: 40vh;
  min-height: 300px;
  background-color: var(--color-secondary);
}

.menu-filters {
  margin-bottom: var(--spacing-xl);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.tag-filters {
  display: flex;
  gap: var(--spacing-sm);
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.tag-filter {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-full);
  border: 1px solid var(--color-border);
  background: var(--color-background);
  cursor: pointer;
  transition: all var(--transition-normal);
}

.tag-filter.active {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.menu-category {
  margin-bottom: var(--spacing-2xl);
}

.category-title {
  margin-bottom: var(--spacing-sm);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-primary);
}

.category-description {
  margin-bottom: var(--spacing-lg);
  font-style: italic;
  color: var(--color-text-light);
}

.menu-item {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.menu-item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-sm);
}

.menu-item-name {
  margin-bottom: 0;
  font-weight: 600;
}

.menu-item-price {
  font-weight: 600;
  color: var(--color-primary);
}

.menu-item-description {
  margin-bottom: var(--spacing-sm);
  color: var(--color-text-light);
}

.menu-item-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.menu-item-tag {
  font-size: var(--font-size-xs);
  padding: 2px var(--spacing-xs);
  border-radius: var(--border-radius-sm);
  background-color: var(--color-background);
  border: 1px solid var(--color-border);
}

/* Lunch menu styles */
.lunch-menu {
  margin-bottom: var(--spacing-2xl);
}

.lunch-menu-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.lunch-menu-title {
  margin-bottom: var(--spacing-xs);
}

.lunch-menu-dates {
  color: var(--color-text-light);
  font-style: italic;
}

.lunch-menu-days {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(3, 1fr);
}

.lunch-menu-days.full-page {
  grid-template-columns: repeat(2, 1fr);
}

.lunch-menu-day {
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
}

.day-title {
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-primary);
  text-align: center;
}

.day-items {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.lunch-menu-item {
  margin-bottom: var(--spacing-md);
}

@media (max-width: 767px) {
  .menu-items.grid {
    grid-template-columns: 1fr;
  }
  
  .lunch-menu-days, .lunch-menu-days.full-page {
    grid-template-columns: 1fr;
  }
}
</style>