<template>
  <div class="team-grid">
    <div class="grid grid-3">
      <div 
        v-for="member in limitedTeamMembers" 
        :key="member.id" 
        class="team-member card">
        <div class="team-member-image">
          <!-- <img :src="member.image" :alt="member.name"> -->
          <div class="placeholder-image"></div>
        </div>
        <h3 class="team-member-name">{{ member.name }}</h3>
        <p class="team-member-position">{{ member.position[$i18n.locale] }}</p>
        <p class="team-member-bio">{{ member.bio[$i18n.locale] }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Type definitions for i18n content
interface LocalizedText {
  en: string;
  de: string;
  [key: string]: string; // Allow any string as key for dynamic locale access
}

interface TeamMember {
  id: string;
  name: string;
  position: LocalizedText;
  bio: LocalizedText;
  image: string;
  order: number;
}

const props = defineProps({
  limit: {
    type: Number,
    default: 0 // 0 means no limit
  }
});

// Mock data - in real app this would come from the CMS
const teamMembers = ref<TeamMember[]>([
  {
    id: 'jane-doe',
    name: 'Jane Doe',
    position: {
      en: 'Head Chef',
      de: 'Küchenchef'
    },
    bio: {
      en: 'Jane has 15 years of experience in the culinary world, specializing in Italian cuisine. She has worked in Michelin-starred restaurants across Europe before joining our team.',
      de: 'Jane hat 15 Jahre Erfahrung in der kulinarischen Welt und ist auf die italienische Küche spezialisiert. Sie hat in Michelin-Restaurants in ganz Europa gearbeitet, bevor sie zu unserem Team kam.'
    },
    image: '/images/team/jane-doe.jpg',
    order: 1
  },
  {
    id: 'john-smith',
    name: 'John Smith',
    position: {
      en: 'Sous Chef',
      de: 'Souschef'
    },
    bio: {
      en: 'John trained at the Culinary Institute of America and specializes in modern European cuisine. He brings creative flair to our seasonal menu items.',
      de: 'John wurde am Culinary Institute of America ausgebildet und ist auf moderne europäische Küche spezialisiert. Er bringt kreativen Flair in unsere saisonalen Menüpunkte.'
    },
    image: '/images/team/john-smith.jpg',
    order: 2
  },
  {
    id: 'maria-garcia',
    name: 'Maria Garcia',
    position: {
      en: 'Pastry Chef',
      de: 'Konditorin'
    },
    bio: {
      en: 'Maria is a master of sweet creations with a background in French pastry. Her desserts combine traditional techniques with innovative flavor combinations.',
      de: 'Maria ist eine Meisterin süßer Kreationen mit Hintergrund in der französischen Konditorei. Ihre Desserts kombinieren traditionelle Techniken mit innovativen Geschmackskombinationen.'
    },
    image: '/images/team/maria-garcia.jpg',
    order: 3
  },
  {
    id: 'thomas-mueller',
    name: 'Thomas Müller',
    position: {
      en: 'Restaurant Manager',
      de: 'Restaurantleiter'
    },
    bio: {
      en: 'Thomas has a degree in hospitality management and oversees all operations of the restaurant. He ensures that every guest has an exceptional dining experience.',
      de: 'Thomas hat einen Abschluss in Hospitality Management und überwacht alle Abläufe des Restaurants. Er sorgt dafür, dass jeder Gast ein außergewöhnliches Esserlebnis hat.'
    },
    image: '/images/team/thomas-mueller.jpg',
    order: 4
  },
  {
    id: 'sophia-chen',
    name: 'Sophia Chen',
    position: {
      en: 'Sommelier',
      de: 'Sommelière'
    },
    bio: {
      en: 'Sophia is our wine expert with certification from the Court of Master Sommeliers. She has curated our wine selection to perfectly complement our menu.',
      de: 'Sophia ist unsere Weinexpertin mit Zertifizierung vom Court of Master Sommeliers. Sie hat unsere Weinauswahl zusammengestellt, um unser Menü perfekt zu ergänzen.'
    },
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