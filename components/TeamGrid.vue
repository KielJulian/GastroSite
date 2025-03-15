<template>
  <div class="team-grid">
    <div v-if="teamMembers.length > 0" class="grid grid-3">
      <div 
        v-for="member in limitedTeamMembers" 
        :key="member.id" 
        class="team-member card">
        <div class="team-member-image">
          <!-- <img :src="member.image" :alt="member.name"> -->
          <div class="placeholder-image"></div>
        </div>
        <h3 class="team-member-name">{{ member.name }}</h3>
        <p class="team-member-position">{{ member.position }}</p>
        <p class="team-member-bio">{{ member.bio }}</p>
      </div>
    </div>
    <div v-else class="team-loading">
      <p>Loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface TeamMember {
  id: string;
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

// Sample data since we removed i18n functionality
const teamMembers = ref<TeamMember[]>([
  {
    id: 'jane-doe',
    name: 'Jane Doe',
    position: 'Head Chef',
    bio: 'Jane has 15 years of experience in the culinary world, specializing in Italian cuisine. She has worked in Michelin-starred restaurants across Europe before joining our team.',
    image: '/images/team/jane-doe.jpg',
    order: 1
  },
  {
    id: 'john-smith',
    name: 'John Smith',
    position: 'Sous Chef',
    bio: 'John trained at the Culinary Institute of America and specializes in modern European cuisine. He brings creative flair to our seasonal menu items.',
    image: '/images/team/john-smith.jpg',
    order: 2
  },
  {
    id: 'maria-garcia',
    name: 'Maria Garcia',
    position: 'Pastry Chef',
    bio: 'Maria is a master of sweet creations with a background in French pastry. Her desserts combine traditional techniques with innovative flavor combinations.',
    image: '/images/team/maria-garcia.jpg',
    order: 3
  },
  {
    id: 'thomas-mueller',
    name: 'Thomas Müller',
    position: 'Restaurant Manager',
    bio: 'Thomas has a degree in hospitality management and oversees all operations of the restaurant. He ensures that every guest has an exceptional dining experience.',
    image: '/images/team/thomas-mueller.jpg',
    order: 4
  },
  {
    id: 'sophia-chen',
    name: 'Sophia Chen',
    position: 'Sommelier',
    bio: 'Sophia is our wine expert with certification from the Court of Master Sommeliers. She has curated our wine selection to perfectly complement our menu.',
    image: '/images/team/sophia-chen.jpg',
    order: 5
  }
]);

// Sort and limit team members
const limitedTeamMembers = computed(() => {
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