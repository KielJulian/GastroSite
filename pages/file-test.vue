<template>
  <div class="container">
    <h1>Direct File System Test</h1>
    
    <div class="buttons">
      <button @click="testDirectApi">Test Direct File API</button>
    </div>
    
    <div v-if="loading">Loading...</div>
    <div v-else-if="error" class="error">Error: {{ error }}</div>
    <div v-else-if="result">
      <h2>Results:</h2>
      <pre>{{ JSON.stringify(result, null, 2) }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const result = ref(null);
const loading = ref(false);
const error = ref(null);

const testDirectApi = async () => {
  loading.value = true;
  error.value = null;
  result.value = null;
  
  try {
    // Call our server API that directly checks content directory structure
    const response = await fetch('/api/debug/content-check');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Direct file test result:', data);
    result.value = data;
  } catch (err) {
    console.error('Error:', err);
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.buttons {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

button {
  background: #27ae60;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #2ecc71;
}

.error {
  color: red;
  margin: 10px 0;
}

pre {
  background: #f8f8f8;
  padding: 15px;
  border-radius: 4px;
  overflow: auto;
}
</style> 