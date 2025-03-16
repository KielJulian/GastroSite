<template>
  <section class="section team-section">
    <div class="container">
      <h2 class="section-title">Our Team</h2>
      <p class="section-description text-center">Meet the culinary experts who make the magic happen in our kitchen.</p>
      <TeamGrid />
    </div>
  </section>
</template>

<script setup lang="ts">
// Import the TeamGrid component
</script>

<style scoped>
.team-section {
  background-color: var(--color-background-alt);
  padding: var(--spacing-2xl) 0;
}

.section-description {
  max-width: 800px;
  margin: 0 auto var(--spacing-xl);
}

.text-center {
  text-align: center;
}
</style>