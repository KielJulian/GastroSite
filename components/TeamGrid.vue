<template>
  <div class="team-grid">
    <div v-if="pending" class="team-loading">
      <p>Loading team members...</p>
    </div>
    <div v-else-if="error" class="error-message">
      <p>Error loading team data. Please try again later.</p>
    </div>
    <div v-else-if="teamMembers && teamMembers.length > 0" class="grid grid-3">
      <div 
        v-for="member in limitedTeamMembers" 
        :key="member._path" 
        class="team-member card">
        <div class="team-member-image">
          <img v-if="member.image" :src="member.image" :alt="member.name">
          <div v-else class="placeholder-image"></div>
        </div>
        <h3 class="team-member-name">{{ member.name }}</h3>
        <p class="team-member-position">{{ member.position }}</p>
        <p class="team-member-bio">{{ member.bio }}</p>
      </div>
    </div>
    <div v-else class="no-team-message">
      <p>No team members found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRestaurantContent } from '~/composables/useContent';

interface TeamMember {
  _path: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  order: number;
}

const props = defineProps({
  limit: {
    type: Number,
    default: 0 // 0 means no limit
  }
});

// Fetch team members from CMS
const { getTeamMembers } = useRestaurantContent();
const { data: teamMembers, pending, error } = useAsyncData(
  'homepage-team-members', 
  () => getTeamMembers(props.limit)
);

// Limit team members if needed
const limitedTeamMembers = computed(() => {
  if (!teamMembers.value) return [];
  
  const sorted = [...teamMembers.value].sort((a, b) => a.order - b.order);
  
  if (props.limit > 0) {
    return sorted.slice(0, props.limit);
  }
  
  return sorted;
});
</script>

<style scoped>
.team-grid {
  margin-bottom: var(--spacing-xl);
}

.team-loading {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
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

.placeholder-image {
  width: 100%;
  height: 100%;
  background-color: var(--color-primary);
  opacity: 0.7;
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