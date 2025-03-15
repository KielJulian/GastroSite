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
      <section class="section">
        <div class="container">
          <h2 class="section-title">Our Team</h2>
          <p class="section-description text-center">Meet the culinary experts who make the magic happen in our kitchen.</p>
          <TeamGrid />
        </div>
      </section>

      <!-- Our Dining Area Section -->
      <DiningArea />

      <!-- Contact Section -->
      <ContactSection />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { useRestaurantContent } from '~/composables/useContent';

// Fetch the latest lunch menu
const { getLatestLunchMenu } = useRestaurantContent();
const { data: lunchMenu, pending: lunchMenuPending, error: lunchMenuError } = useAsyncData(
  'homepage-lunch-menu', 
  () => getLatestLunchMenu()
);
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