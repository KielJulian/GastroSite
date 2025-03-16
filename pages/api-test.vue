<template>
  <div class="container">
    <h1>API Test Page</h1>
    
    <div class="buttons">
      <button @click="testStandardApi" :disabled="loading">
        Test Standard Content API
      </button>
      
      <button @click="testCustomApi" :disabled="loading">
        Test Custom Content API
      </button>
      
      <button @click="testFsCheck" :disabled="loading">
        Test Filesystem Check
      </button>
    </div>
    
    <div v-if="loading" class="loading">
      Loading...
    </div>
    
    <div v-if="error" class="error">
      <p>{{ error }}</p>
    </div>
    
    <div v-if="data" class="result">
      <h3>API Response:</h3>
      <pre>{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      error: null,
      data: null,
      baseUrl: typeof window !== 'undefined' ? '' : 'http://localhost:3000'
    };
  },
  methods: {
    createUrl(path) {
      return `${this.baseUrl}${path}`;
    },
    
    async testStandardApi() {
      this.loading = true;
      this.error = null;
      this.data = null;
      
      try {
        const url = this.createUrl('/api/_content/query?_path=/menu/items');
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        this.data = await response.json();
      } catch (err) {
        console.error('API error:', err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    
    async testCustomApi() {
      this.loading = true;
      this.error = null;
      this.data = null;
      
      try {
        const url = this.createUrl('/api/content/menu/items');
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        this.data = await response.json();
      } catch (err) {
        console.error('API error:', err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    
    async testFsCheck() {
      this.loading = true;
      this.error = null;
      this.data = null;
      
      try {
        const url = this.createUrl('/api/debug/fs-check');
        console.log('Fetching from:', url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        this.data = await response.json();
      } catch (err) {
        console.error('API error:', err);
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
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
}

button:hover {
  background-color: #0056b3;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.loading {
  margin: 20px 0;
  font-style: italic;
}

.error {
  margin: 20px 0;
  padding: 10px;
  background-color: #ffeeee;
  border: 1px solid #ffcccc;
  border-radius: 4px;
  color: #cc0000;
}

.result {
  margin-top: 20px;
}

pre {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 4px;
  overflow: auto;
  font-size: 14px;
  white-space: pre-wrap;
}
</style> 