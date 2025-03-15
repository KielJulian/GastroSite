<template>
  <NuxtLayout name="default">
    <div>
      <!-- Hero Section -->
      <section class="hero team-hero">
        <div class="container">
          <div class="hero-content">
            <h1>Our Team</h1>
            <p>Meet the culinary experts who make the magic happen in our kitchen</p>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="section">
        <div class="container">
          <div v-if="pending" class="loading-indicator">Loading team data...</div>
          <div v-else-if="error" class="error-message">
            Error loading team data. Please try again later.
          </div>
          <div v-else class="team-grid">
            <div class="grid grid-3">
              <div 
                v-for="member in teamMembers" 
                :key="member._path" 
                class="team-member card">
                <div class="team-member-image">
                  <img :src="member.image" :alt="member.name">
                </div>
                <h3 class="team-member-name">{{ member.name }}</h3>
                <p class="team-member-position">{{ member.position }}</p>
                <p class="team-member-bio">{{ member.bio }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup>
import { useRestaurantContent } from '~/composables/useContent';

// Use the composable to fetch team members from content
const { getTeamMembers } = useRestaurantContent();
const { data: teamMembers, pending, error } = useAsyncData('team-members', () => getTeamMembers());
</script>

<style scoped>
.team-hero {
  height: 40vh;
  min-height: 300px;
  background-color: var(--color-accent);
}

.team-grid {
  margin-bottom: var(--spacing-xl);
}

.team-member {
  text-align: center;
  transition: transform var(--transition-normal);
}

.team-member-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto var(--spacing-md);
  border: 3px solid var(--color-primary);
}

.team-member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member-name {
  margin-bottom: var(--spacing-xs);
}

.team-member-position {
  color: var(--color-primary);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
}

.team-member-bio {
  font-size: var(--font-size-sm);
  color: var(--color-text-light);
}

@media (max-width: 1024px) {
  .team-grid .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .team-grid .grid {
    grid-template-columns: 1fr;
  }
  
  .team-member {
    max-width: 400px;
    margin: 0 auto var(--spacing-xl);
  }
}
</style>