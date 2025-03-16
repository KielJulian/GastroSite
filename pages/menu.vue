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
        
        <div v-if="lunchMenuPending" class="loading-indicator">Loading lunch menu...</div>
        <div v-else-if="lunchMenuError" class="error-message">
          Error loading lunch menu. Please try again later.
        </div>
        <LunchMenuPreview v-else-if="lunchMenu" :current-menu="lunchMenu" :is-full-page="true" />
        <div v-else class="no-menu-message">
          No lunch menu available at this time.
        </div>
      </div>
    </section>

    <!-- Menu Categories Section -->
    <section class="section">
      <div class="container">
        <h2 class="section-title">À La Carte Menu</h2>
        <p class="section-description text-center">Our regular menu is available daily from 17:00 to 22:00</p>
        
        <div v-if="menuDataPending" class="loading-indicator">Loading menu data...</div>
        <div v-else-if="menuDataError" class="error-message">
          Error loading menu data. Please try again later.
        </div>
        <template v-else>
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
                :key="item._path" 
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
        </template>
      </div>
    </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, onServerPrefetch } from 'vue';
import { useRestaurantContent } from '~/composables/useRestaurantContent';

// Use our composable
const { 
  getMenuCategories, 
  getMenuTags, 
  getMenuItems, 
  getLatestLunchMenu 
} = useRestaurantContent();

// Active tag filters state
const activeTagFilters = ref<string[]>([]);

// Create unique keys for each request - using string keys without timestamps for better SSR caching
const categoriesKey = 'menu-categories';
const tagsKey = 'menu-tags';
const menuItemsKey = 'menu-items';
const lunchMenuKey = 'latest-lunch-menu';

// Fetch menu categories
const { data: categories, pending: categoriesPending, error: categoriesError, refresh: refreshCategories } = useAsyncData(
  categoriesKey, 
  () => getMenuCategories(),
  { 
    immediate: true,
    server: true,
    lazy: false,
    transform: (data) => {
      console.log('Categories data transformed:', data);
      return data || [];
    }
  }
);

// Fetch menu tags
const { data: tags, pending: tagsPending, error: tagsError, refresh: refreshTags } = useAsyncData(
  tagsKey, 
  () => getMenuTags(),
  { 
    immediate: true,
    server: true,
    lazy: false,
    transform: (data) => {
      console.log('Tags data transformed:', data);
      return data || [];
    }
  }
);

// Fetch menu items
const { data: menuItems, pending: menuItemsPending, error: menuItemsError, refresh: refreshMenuItems } = useAsyncData(
  menuItemsKey, 
  () => getMenuItems(),
  { 
    immediate: true,
    server: true,
    lazy: false,
    transform: (data) => {
      console.log('Menu items data transformed:', data);
      return data || [];
    }
  }
);

// Fetch latest lunch menu
const { data: lunchMenu, pending: lunchMenuPending, error: lunchMenuError, refresh: refreshLunchMenu } = useAsyncData(
  lunchMenuKey, 
  () => getLatestLunchMenu(),
  { 
    immediate: true,
    server: true,
    lazy: false,
    transform: (data) => {
      console.log('Lunch menu data transformed:', data);
      return data;
    }
  }
);

// Make sure data is prefetched on server
onServerPrefetch(async () => {
  console.log('Server prefetching menu data');
  await Promise.all([
    refreshCategories(),
    refreshTags(),
    refreshMenuItems(),
    refreshLunchMenu()
  ]);
});

// After a successful load, log the data to help with debugging
onMounted(() => {
  console.log('Menu mounted, categories:', categories.value);
  console.log('Menu mounted, tags:', tags.value);
  console.log('Menu mounted, items:', menuItems.value);
});

// Computed values for loading states
const menuDataPending = computed(() => categoriesPending.value || tagsPending.value || menuItemsPending.value);
const menuDataError = computed(() => categoriesError.value || tagsError.value || menuItemsError.value);

// Sort categories by order
const sortedCategories = computed(() => {
  if (!categories.value) return [];
  return [...categories.value].sort((a, b) => a.order - b.order);
});

interface MenuItem {
  _path?: string;
  category: string;
  tags?: string[];
  order: number;
  [key: string]: any;
}

// Get items for a specific category
const getFilteredItemsByCategory = (categoryId: string): MenuItem[] => {
  if (!menuItems.value) return [];
  
  let items = (menuItems.value as MenuItem[])
    .filter(item => item.category === categoryId)
    .sort((a, b) => a.order - b.order);
  
  // Apply tag filters if any are active
  if (activeTagFilters.value.length > 0) {
    items = items.filter(item => 
      activeTagFilters.value.every(tagId => item.tags && item.tags.includes(tagId))
    );
  }
  
  return items;
};

// Toggle tag filter
const toggleTagFilter = (tagId: string): void => {
  const index = activeTagFilters.value.indexOf(tagId);
  if (index === -1) {
    activeTagFilters.value.push(tagId);
  } else {
    activeTagFilters.value.splice(index, 1);
  }
};

// Get tag name by ID
const getTagName = (tagId: string): string => {
  if (!tags.value) return '';
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