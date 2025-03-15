<template>
  <NuxtLayout name="default">
    <div>
      <!-- Hero Section -->
      <HeroSection />

      <!-- Lunch Menu Section -->
      <section class="section">
        <div class="container">
          <h2 class="section-title">This Week's Lunch Specials</h2>
          <LunchMenuPreview />
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
// No specific script needed as components handle their own functionality
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