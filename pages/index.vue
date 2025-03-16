<template>
  <NuxtLayout name="default">
    <div>
      <!-- Hero Section -->
      <HeroSection />

      <!-- Lunch Menu Section -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">This Week's Lunch Specials</h2>
          <div v-if="lunchMenuPending" class="loading-indicator">Loading lunch menu...</div>
          <div v-else-if="lunchMenuError" class="error-message">
            Error loading lunch menu. Please try again later.
          </div>
          <LunchMenuPreview v-else-if="lunchMenu" :current-menu="lunchMenu" />
          <div v-else class="no-menu-message">
            No lunch menu available at this time.
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <TeamSection />

      <!-- Our Dining Area Section -->
      <DiningArea />

      <!-- Contact Section -->
      <ContactSection />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useRestaurantContent } from '~/composables/useContent';

// Fetch the latest lunch menu
const { getLatestLunchMenu } = useRestaurantContent();
// Create a unique key for this request
const lunchMenuKey = 'homepage-lunch-menu-' + Date.now();

const { data: lunchMenu, pending: lunchMenuPending, error: lunchMenuError, refresh: refreshLunchMenu } = useAsyncData(
  lunchMenuKey, 
  () => getLatestLunchMenu(),
  { 
    server: false,
    immediate: true
  }
);

// Set up a refresh interval to check for content updates
onMounted(() => {
  // Refresh the data every 30 seconds to check for content updates
  const refreshInterval = setInterval(() => {
    refreshLunchMenu();
  }, 30000);

  onUnmounted(() => {
    clearInterval(refreshInterval);
  });
});
</script>

<style scoped>
.section-description {
  max-width: 800px;
  margin: 0 auto var(--spacing-xl);
}

.text-center {
  text-align: center;
}
</style>