<template>
  <NuxtLayout name="default">
    <div>
    <!-- Hero Section -->
    <section class="hero menu-hero">
      <div class="container">
        <div class="hero-content">
          <h1>{{ $t('menu.hero.title') }}</h1>
          <p>{{ $t('menu.hero.subtitle') }}</p>
        </div>
      </div>
    </section>

    <!-- Lunch Menu Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ $t('menu.lunchMenu.title') }}</h2>
        <p class="section-description text-center">{{ $t('menu.lunchMenu.description') }}</p>
        <LunchMenuPreview :isFullPage="true" />
      </div>
    </section>

    <!-- Menu Categories Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ $t('menu.regularMenu.title') }}</h2>
        <p class="section-description text-center">{{ $t('menu.regularMenu.description') }}</p>
        
        <!-- Menu filters -->
        <div class="menu-filters">
          <div class="tag-filters">
            <span>{{ $t('menu.filters.dietary') }}:</span>
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
                <h4 class="menu-item-name">{{ item.name[$i18n.locale] }}</h4>
                <span class="menu-item-price">€{{ item.price.toFixed(2) }}</span>
              </div>
              <p class="menu-item-description">{{ item.description[$i18n.locale] }}</p>
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

<script setup lang="ts">
import { ref, computed } from 'vue';

// Type definitions for i18n content
interface LocalizedText {
  en: string;
  de: string;
  [key: string]: string; // Allow any string as key for dynamic locale access
}

interface MenuItem {
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  price: number;
  category: string;
  tags: string[];
  order: number;
}

interface Category {
  id: string;
  name: string;
  description: string;
  order: number;
}

interface Tag {
  id: string;
  name: string;
  icon: string;
}

// Mock data - in real app this would come from the CMS
const categories = ref<Category[]>([
  { id: 'pizza', name: 'Pizza', description: 'Our stone-baked pizzas', order: 1 },
  { id: 'pasta', name: 'Pasta', description: 'Homemade pasta dishes', order: 2 },
  { id: 'salads', name: 'Salads', description: 'Fresh seasonal salads', order: 3 },
  { id: 'desserts', name: 'Desserts', description: 'Sweet treats', order: 4 }
]);

const tags = ref<Tag[]>([
  { id: 'vegetarian', name: 'Vegetarian', icon: 'leaf' },
  { id: 'vegan', name: 'Vegan', icon: 'plant' },
  { id: 'spicy', name: 'Spicy', icon: 'fire' },
  { id: 'gluten-free', name: 'Gluten-Free', icon: 'wheat-slash' }
]);

const menuItems = ref<MenuItem[]>([
  {
    id: 'margherita',
    name: { en: 'Margherita Pizza', de: 'Pizza Margherita' },
    description: { 
      en: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
      de: 'Klassische Pizza mit Tomatensauce, Mozzarella und frischem Basilikum' 
    },
    price: 10.90,
    category: 'pizza',
    tags: ['vegetarian'],
    order: 1
  },
  {
    id: 'diavola',
    name: { en: 'Diavola Pizza', de: 'Pizza Diavola' },
    description: { 
      en: 'Spicy pizza with tomato sauce, mozzarella, and spicy salami',
      de: 'Scharfe Pizza mit Tomatensauce, Mozzarella und scharfer Salami' 
    },
    price: 12.90,
    category: 'pizza',
    tags: ['spicy'],
    order: 2
  },
  {
    id: 'vegetariana',
    name: { en: 'Vegetariana Pizza', de: 'Pizza Vegetariana' },
    description: { 
      en: 'Veggie pizza with tomato sauce, mozzarella, and seasonal vegetables',
      de: 'Gemüsepizza mit Tomatensauce, Mozzarella und saisonalem Gemüse' 
    },
    price: 11.90,
    category: 'pizza',
    tags: ['vegetarian', 'vegan'],
    order: 3
  },
  {
    id: 'carbonara',
    name: { en: 'Spaghetti Carbonara', de: 'Spaghetti Carbonara' },
    description: { 
      en: 'Spaghetti with creamy egg sauce, pancetta, and pecorino cheese',
      de: 'Spaghetti mit cremiger Eiersauce, Pancetta und Pecorino-Käse' 
    },
    price: 13.90,
    category: 'pasta',
    tags: [],
    order: 1
  },
  {
    id: 'bolognese',
    name: { en: 'Tagliatelle Bolognese', de: 'Tagliatelle Bolognese' },
    description: { 
      en: 'Tagliatelle with rich meat ragù and parmesan',
      de: 'Tagliatelle mit reichhaltigem Fleischragout und Parmesan' 
    },
    price: 14.90,
    category: 'pasta',
    tags: [],
    order: 2
  },
  {
    id: 'arrabbiata',
    name: { en: 'Penne Arrabbiata', de: 'Penne Arrabbiata' },
    description: { 
      en: 'Penne with spicy tomato sauce and garlic',
      de: 'Penne mit scharfer Tomatensauce und Knoblauch' 
    },
    price: 12.90,
    category: 'pasta',
    tags: ['vegetarian', 'vegan', 'spicy'],
    order: 3
  },
  {
    id: 'caesar',
    name: { en: 'Caesar Salad', de: 'Caesar Salad' },
    description: { 
      en: 'Romaine lettuce with Caesar dressing, croutons, and parmesan',
      de: 'Römersalat mit Caesar-Dressing, Croutons und Parmesan' 
    },
    price: 9.90,
    category: 'salads',
    tags: ['vegetarian'],
    order: 1
  },
  {
    id: 'greek',
    name: { en: 'Greek Salad', de: 'Griechischer Salat' },
    description: { 
      en: 'Fresh salad with tomatoes, cucumber, feta cheese, and olives',
      de: 'Frischer Salat mit Tomaten, Gurken, Feta-Käse und Oliven' 
    },
    price: 8.90,
    category: 'salads',
    tags: ['vegetarian', 'gluten-free'],
    order: 2
  },
  {
    id: 'tiramisu',
    name: { en: 'Tiramisu', de: 'Tiramisu' },
    description: { 
      en: 'Classic Italian dessert with coffee-soaked ladyfingers and mascarpone cream',
      de: 'Klassisches italienisches Dessert mit in Kaffee getränkten Löffelbiskuits und Mascarpone-Creme' 
    },
    price: 6.90,
    category: 'desserts',
    tags: ['vegetarian'],
    order: 1
  },
  {
    id: 'pannacotta',
    name: { en: 'Panna Cotta', de: 'Panna Cotta' },
    description: { 
      en: 'Creamy vanilla dessert with berry sauce',
      de: 'Cremiges Vanilledessert mit Beerensauce' 
    },
    price: 5.90,
    category: 'desserts',
    tags: ['vegetarian', 'gluten-free'],
    order: 2
  },
]);

const activeTagFilters = ref<string[]>([]);

// Sort categories by order
const sortedCategories = computed(() => {
  return [...categories.value].sort((a, b) => a.order - b.order);
});

// Get items for a specific category
const getFilteredItemsByCategory = (categoryId: string) => {
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
const toggleTagFilter = (tagId: string) => {
  const index = activeTagFilters.value.indexOf(tagId);
  if (index === -1) {
    activeTagFilters.value.push(tagId);
  } else {
    activeTagFilters.value.splice(index, 1);
  }
};

// Get tag name by ID
const getTagName = (tagId: string): string => {
  const tag = tags.value.find(tag => tag.id === tagId);
  return tag ? tag.name : '';
};
</script>

<style scoped>
.menu-hero {
  height: 40vh;
  min-height: 300px;
  /* background-image: url('/images/menu-hero.jpg'); */
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

@media (max-width: 767px) {
  .menu-items.grid {
    grid-template-columns: 1fr;
  }
}
</style>