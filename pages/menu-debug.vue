<template>
  <NuxtLayout name="default">
    <div>
    <!-- Hero Section -->
    <section class="hero menu-hero">
      <div class="container">
        <div class="hero-content">
          <h1>Menu Debug</h1>
          <p>This page helps debug content loading issues</p>
        </div>
      </div>
    </section>

    <!-- Debug Info Section -->
    <section class="section debug-section">
      <div class="container">
        <h2 class="section-title">Content Diagnostics</h2>
        
        <div class="debug-box">
          <h3>Categories</h3>
          <div v-if="categoriesPending">Loading categories...</div>
          <div v-else-if="categoriesError" class="error-message">
            <strong>Error loading categories:</strong>
            <pre>{{ categoriesError.toString() }}</pre>
          </div>
          <div v-else-if="!categories || categories.length === 0" class="error-message">
            No categories found. Check content structure.
          </div>
          <div v-else>
            <div class="success-message">Found {{ categories.length }} categories</div>
            <pre>{{ JSON.stringify(categories, null, 2) }}</pre>
          </div>
        </div>

        <div class="debug-box">
          <h3>Menu Items</h3>
          <div v-if="menuItemsPending">Loading menu items...</div>
          <div v-else-if="menuItemsError" class="error-message">
            <strong>Error loading menu items:</strong>
            <pre>{{ menuItemsError.toString() }}</pre>
          </div>
          <div v-else-if="!menuItems || menuItems.length === 0" class="error-message">
            No menu items found. Check content structure.
          </div>
          <div v-else>
            <div class="success-message">Found {{ menuItems.length }} menu items</div>
            <pre>{{ JSON.stringify(menuItems, null, 2) }}</pre>
          </div>
        </div>

        <div class="debug-box">
          <h3>Tags</h3>
          <div v-if="tagsPending">Loading tags...</div>
          <div v-else-if="tagsError" class="error-message">
            <strong>Error loading tags:</strong>
            <pre>{{ tagsError.toString() }}</pre>
          </div>
          <div v-else-if="!tags || tags.length === 0" class="error-message">
            No tags found. Check content structure.
          </div>
          <div v-else>
            <div class="success-message">Found {{ tags.length }} tags</div>
            <pre>{{ JSON.stringify(tags, null, 2) }}</pre>
          </div>
        </div>

        <div class="debug-box">
          <h3>Direct Content Query Test</h3>
          <button @click="runDirectContentTest" class="debug-button">Run Test Query</button>
          <div v-if="directQueryPending">Running direct query...</div>
          <div v-else-if="directQueryError" class="error-message">
            <strong>Error running direct query:</strong>
            <pre>{{ directQueryError.toString() }}</pre>
          </div>
          <div v-else>
            <div class="success-message">Direct query results:</div>
            <pre>{{ JSON.stringify(directQueryResults, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

// Direct content query test results
const directQueryResults = ref<any>(null);
const directQueryPending = ref<boolean>(false);
const directQueryError = ref<Error | null>(null);

// Get the appropriate content API
const $content = useContent();

// Create unique keys for each request
const categoriesKey = 'debug-categories-' + Date.now();
const tagsKey = 'debug-tags-' + Date.now();
const menuItemsKey = 'debug-items-' + Date.now();

// Fetch menu categories directly without composable
const { data: categories, pending: categoriesPending, error: categoriesError } = useAsyncData(
  categoriesKey, 
  async () => {
    console.log('DEBUG: Fetching categories...');
    try {
      const result = await $content('/menu/categories').find();
      console.log('DEBUG: Categories query result:', result);
      
      // Check data structure - for YAML files
      if (result && Array.isArray(result) && result.length > 0 && result[0].categories) {
        console.log('DEBUG: Found categories array in YAML file');
        return result[0].categories;
      } 
      
      // If direct structure
      if (result && Array.isArray(result)) {
        console.log('DEBUG: Found categories as direct array');
        return result;
      }
      
      console.warn('DEBUG: Categories data structure unexpected:', result);
      return [];
    } catch (error) {
      console.error('DEBUG: Error fetching categories:', error);
      throw error;
    }
  },
  { 
    server: true // Enable server-side rendering
  }
);

// Fetch menu tags directly
const { data: tags, pending: tagsPending, error: tagsError } = useAsyncData(
  tagsKey, 
  async () => {
    console.log('DEBUG: Fetching tags...');
    try {
      const result = await $content('/menu/tags').find();
      console.log('DEBUG: Tags query result:', result);
      
      // Check data structure - for YAML files
      if (result && Array.isArray(result) && result.length > 0 && result[0].tags) {
        console.log('DEBUG: Found tags array in YAML file');
        return result[0].tags;
      }
      
      // If direct structure
      if (result && Array.isArray(result)) {
        console.log('DEBUG: Found tags as direct array');
        return result;
      }
      
      console.warn('DEBUG: Tags data structure unexpected:', result);
      return [];
    } catch (error) {
      console.error('DEBUG: Error fetching tags:', error);
      throw error;
    }
  },
  { 
    server: true // Enable server-side rendering
  }
);

// Fetch menu items directly
const { data: menuItems, pending: menuItemsPending, error: menuItemsError } = useAsyncData(
  menuItemsKey, 
  async () => {
    console.log('DEBUG: Fetching menu items...');
    try {
      const result = await $content('/menu/items').find();
      console.log('DEBUG: Menu items query result:', result);
      return result;
    } catch (error) {
      console.error('DEBUG: Error fetching menu items:', error);
      throw error;
    }
  },
  { 
    server: true // Enable server-side rendering
  }
);

// Direct content query test
const runDirectContentTest = async () => {
  directQueryPending.value = true;
  directQueryError.value = null;
  directQueryResults.value = null;
  
  try {
    console.log('DEBUG: Running direct content query test...');
    // Test simple query first
    const allContent = await $content().find();
    console.log('DEBUG: All content:', allContent);
    
    // Then test specific directory
    const itemsContent = await $content('/menu/items').find();
    console.log('DEBUG: Items content:', itemsContent);
    
    directQueryResults.value = {
      allContentCount: allContent.length,
      itemsContentCount: itemsContent.length,
      itemsSample: itemsContent.slice(0, 2)
    };
  } catch (error) {
    console.error('DEBUG: Error in direct query test:', error);
    directQueryError.value = error as Error;
  } finally {
    directQueryPending.value = false;
  }
};

onMounted(() => {
  console.log('DEBUG: Menu debug page mounted');
});
</script>

<style scoped>
.menu-hero {
  height: 30vh;
  min-height: 200px;
  background-color: var(--color-secondary);
}

.debug-section {
  background-color: #f5f5f5;
}

.debug-box {
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

.debug-box h3 {
  margin-top: 0;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.error-message {
  background-color: #fff0f0;
  color: #d32f2f;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.success-message {
  background-color: #f0fff0;
  color: #388e3c;
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 10px;
}

pre {
  background-color: #f8f8f8;
  padding: 10px;
  border-radius: 4px;
  overflow: auto;
  font-size: 12px;
}

.debug-button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 10px;
}

.debug-button:hover {
  background-color: #1565c0;
}
</style> 