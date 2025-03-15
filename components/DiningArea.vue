<template>
  <section class="section rooms-section">
    <div class="container">
      <h2 class="section-title">Our Dining Areas</h2>
      <p class="section-description text-center">Discover our different dining areas, each with its own unique atmosphere.</p>
      
      <div class="grid">
        <div class="grid-item item-1">
          <div class="placeholder-img" aria-label="Main Dining Area">Main Dining Area</div>
        </div>
        <div class="grid-item item-2">
          <div class="placeholder-img" aria-label="Private Dining Area">Private Dining Area</div>
        </div>
        <div class="grid-item item-3">
          <div class="placeholder-img" aria-label="Bar Area">Bar Area</div>
        </div>
        <div class="grid-item item-4">
          <div class="placeholder-img" aria-label="Outdoor Seating">Outdoor Seating</div>
        </div>
        <div class="grid-item item-5">
          <div class="placeholder-img" aria-label="Main Hall">Main Hall</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No specific script needed for this component
</script>

<style scoped>
.section-description {
  max-width: 800px;
  margin: 0 auto var(--spacing-xl);
}

.grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(200px, auto);
  gap: 15px;
  margin-top: var(--spacing-xl);
}

.grid-item {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.placeholder-img {
  width: 100%;
  height: 100%;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #666;
  font-size: 18px;
  transition: transform 0.3s ease;
}

.grid-item:hover .placeholder-img {
  transform: scale(1.05);
  background-color: #e0e0e0;
}

.item-1 {
  grid-column: span 5;
  grid-row: span 1;
}

.item-2 {
  grid-column: span 7;
  grid-row: span 1;
}

.item-3 {
  grid-column: span 4;
  grid-row: span 1;
}

.item-4 {
  grid-column: span 4;
  grid-row: span 1;
}

.item-5 {
  grid-column: span 4;
  grid-row: span 1;
}

@media (max-width: 767px) {
  .rooms-section .grid {
    grid-template-columns: repeat(6, 1fr);
  }
  
  .item-1, .item-2, .item-3, .item-4, .item-5 {
    grid-column: span 6;
  }
}
</style>