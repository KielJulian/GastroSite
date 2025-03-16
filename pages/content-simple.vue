<template>
  <div>
    <h1>Simple Content Test</h1>
    
    <div>
      <button @click="testContent">Test Direct Content Query</button>
      
      <div v-if="loading">Loading...</div>
      <div v-else-if="error">Error: {{ error }}</div>
      <div v-else-if="result">
        <h2>Results:</h2>
        <pre>{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
// Use simple script setup without TypeScript
import { ref } from 'vue';
import { useRuntimeConfig } from '#app';

const result = ref(null);
const loading = ref(false);
const error = ref(null);

async function testContent() {
  loading.value = true;
  error.value = null;
  result.value = null;
  
  try {
    // Use direct fetch instead of queryContent
    const response = await fetch('/api/_content/query?_path=/menu/items');
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('Content result:', data);
    result.value = data;
  } catch (err) {
    console.error('Error:', err);
    error.value = err.toString();
  } finally {
    loading.value = false;
  }
}
</script>

<style>
pre {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
  max-height: 400px;
  overflow: auto;
}

button {
  background: #42b883;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  margin: 16px 0;
  cursor: pointer;
}

button:hover {
  background: #3aa776;
}
</style> 