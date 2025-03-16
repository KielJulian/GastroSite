<template>
  <div class="container">
    <h1>Content Test Page</h1>
    
    <div class="section">
      <h2>System Information</h2>
      <button @click="testFsCheck" :disabled="loading.fsCheck">
        Test Filesystem
      </button>
      <div v-if="loading.fsCheck" class="loading">Loading filesystem info...</div>
      <div v-if="fsData" class="result">
        <h3>Filesystem Check:</h3>
        <pre>{{ JSON.stringify(fsData, null, 2) }}</pre>
      </div>
    </div>
    
    <div class="section">
      <h2>Menu Categories</h2>
      <button @click="testCategories" :disabled="loading.categories">
        Test Categories
      </button>
      <div v-if="loading.categories" class="loading">Loading categories...</div>
      <div v-if="error.categories" class="error">
        <p>{{ error.categories }}</p>
      </div>
      <div v-if="categories && categories.length > 0" class="result">
        <h3>Categories ({{ categories.length }}):</h3>
        <ul>
          <li v-for="category in categories" :key="category.id">
            <strong>{{ category.name }}</strong> ({{ category.id }}) - {{ category.description }}
          </li>
        </ul>
      </div>
    </div>
    
    <div class="section">
      <h2>Menu Tags</h2>
      <button @click="testTags" :disabled="loading.tags">
        Test Tags
      </button>
      <div v-if="loading.tags" class="loading">Loading tags...</div>
      <div v-if="error.tags" class="error">
        <p>{{ error.tags }}</p>
      </div>
      <div v-if="tags && tags.length > 0" class="result">
        <h3>Tags ({{ tags.length }}):</h3>
        <ul>
          <li v-for="tag in tags" :key="tag.id">
            <strong>{{ tag.name }}</strong> ({{ tag.id }}) - Icon: {{ tag.icon }}
          </li>
        </ul>
      </div>
    </div>
    
    <div class="section">
      <h2>Menu Items</h2>
      <button @click="testMenuItems" :disabled="loading.menuItems">
        Test Menu Items
      </button>
      <div v-if="loading.menuItems" class="loading">Loading menu items...</div>
      <div v-if="error.menuItems" class="error">
        <p>{{ error.menuItems }}</p>
      </div>
      <div v-if="menuItems && menuItems.length > 0" class="result">
        <h3>Menu Items ({{ menuItems.length }}):</h3>
        <ul>
          <li v-for="item in menuItems" :key="item.id || item.name">
            <strong>{{ item.name }}</strong> - {{ item.price }}€
            <div>Category: {{ item.category }}</div>
            <div>Tags: {{ item.tags ? item.tags.join(', ') : 'None' }}</div>
          </li>
        </ul>
      </div>
    </div>
    
    <div class="section">
      <h2>Team Members</h2>
      <button @click="testTeamMembers" :disabled="loading.team">
        Test Team Members
      </button>
      <div v-if="loading.team" class="loading">Loading team members...</div>
      <div v-if="error.team" class="error">
        <p>{{ error.team }}</p>
      </div>
      <div v-if="teamMembers && teamMembers.length > 0" class="result">
        <h3>Team Members ({{ teamMembers.length }}):</h3>
        <ul>
          <li v-for="member in teamMembers" :key="member.id">
            <strong>{{ member.name }}</strong> - {{ member.position }}
          </li>
        </ul>
      </div>
    </div>
    
    <div class="section">
      <h2>Direct API Test</h2>
      <div class="buttons">
        <button @click="testDirectApi('/api/content/menu/categories')" :disabled="loading.directApi">
          Test Categories API
        </button>
        <button @click="testDirectApi('/api/content/menu/tags')" :disabled="loading.directApi">
          Test Tags API
        </button>
        <button @click="testDirectApi('/api/content/menu/items')" :disabled="loading.directApi">
          Test Menu Items API
        </button>
        <button @click="testDirectApi('/api/content/team')" :disabled="loading.directApi">
          Test Team API
        </button>
      </div>
      <div v-if="loading.directApi" class="loading">Loading from API...</div>
      <div v-if="error.directApi" class="error">
        <p>{{ error.directApi }}</p>
      </div>
      <div v-if="directApiData" class="result">
        <h3>API Response:</h3>
        <pre>{{ JSON.stringify(directApiData, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Explicitly specify the language as TypeScript
import { ref } from 'vue';
import { useRestaurantContent } from '~/composables/useRestaurantContent';
import { useTeamMembers } from '~/composables/useTeamMembers';

// Initialize composables
const { getMenuCategories, getMenuTags, getMenuItems } = useRestaurantContent();
const { getTeamMembers } = useTeamMembers();

// State
const categories = ref([]);
const tags = ref([]);
const menuItems = ref([]);
const teamMembers = ref([]);
const fsData = ref(null);
const directApiData = ref(null);

const loading = ref({
  categories: false,
  tags: false,
  menuItems: false,
  team: false,
  fsCheck: false,
  directApi: false
});

const error = ref({
  categories: null,
  tags: null,
  menuItems: null,
  team: null,
  fsCheck: null,
  directApi: null
});

// Helper to create URLs that work in both client and server
const createApiUrl = (path) => {
  // Check if we're running on client or server
  if (typeof window !== 'undefined') {
    // Client-side - use relative URL
    return path;
  } else {
    // Server-side - use absolute URL with origin
    try {
      return `http://localhost:3000${path}`;
    } catch (err) {
      console.error('Error creating API URL:', err);
      return path;
    }
  }
};

// Test functions
const testCategories = async () => {
  loading.value.categories = true;
  error.value.categories = null;
  
  try {
    const result = await getMenuCategories();
    categories.value = result;
    console.log('Categories result:', result);
  } catch (err) {
    console.error('Error testing categories:', err);
    error.value.categories = err.message || 'Error fetching categories';
  } finally {
    loading.value.categories = false;
  }
};

const testTags = async () => {
  loading.value.tags = true;
  error.value.tags = null;
  
  try {
    const result = await getMenuTags();
    tags.value = result;
    console.log('Tags result:', result);
  } catch (err) {
    console.error('Error testing tags:', err);
    error.value.tags = err.message || 'Error fetching tags';
  } finally {
    loading.value.tags = false;
  }
};

const testMenuItems = async () => {
  loading.value.menuItems = true;
  error.value.menuItems = null;
  
  try {
    const result = await getMenuItems();
    menuItems.value = result;
    console.log('Menu items result:', result);
  } catch (err) {
    console.error('Error testing menu items:', err);
    error.value.menuItems = err.message || 'Error fetching menu items';
  } finally {
    loading.value.menuItems = false;
  }
};

const testTeamMembers = async () => {
  loading.value.team = true;
  error.value.team = null;
  
  try {
    const result = await getTeamMembers();
    teamMembers.value = result;
    console.log('Team members result:', result);
  } catch (err) {
    console.error('Error testing team members:', err);
    error.value.team = err.message || 'Error fetching team members';
  } finally {
    loading.value.team = false;
  }
};

const testFsCheck = async () => {
  loading.value.fsCheck = true;
  error.value.fsCheck = null;
  
  try {
    const url = createApiUrl('/api/debug/fs-check');
    console.log('Fetching from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    fsData.value = await response.json();
  } catch (err) {
    console.error('Error testing filesystem:', err);
    error.value.fsCheck = err.message || 'Error checking filesystem';
  } finally {
    loading.value.fsCheck = false;
  }
};

const testDirectApi = async (endpoint) => {
  loading.value.directApi = true;
  error.value.directApi = null;
  directApiData.value = null;
  
  try {
    const url = createApiUrl(endpoint);
    console.log('Fetching from:', url);
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    directApiData.value = await response.json();
  } catch (err) {
    console.error('API error:', err);
    error.value.directApi = err.message;
  } finally {
    loading.value.directApi = false;
  }
};
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 30px;
}

.section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 1px solid #eee;
}

h2 {
  margin-bottom: 15px;
}

.buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

button {
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 15px;
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  margin: 15px 0;
  font-style: italic;
}

.error {
  margin: 15px 0;
  padding: 10px;
  background-color: #ffeeee;
  border: 1px solid #ffcccc;
  border-radius: 4px;
  color: #cc0000;
}

.result {
  margin-top: 15px;
}

pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow: auto;
  font-size: 14px;
  white-space: pre-wrap;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 15px;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 4px;
}
</style> 