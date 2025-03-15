<template>
  <div class="lunch-menu">
    <div class="lunch-menu-header">
      <h3 class="lunch-menu-title">{{ currentMenu.title[$i18n.locale] }}</h3>
      <p class="lunch-menu-dates">{{ formatDateRange(currentMenu.startDate, currentMenu.endDate) }}</p>
    </div>
    
    <div class="lunch-menu-days" :class="{ 'full-page': isFullPage }">
      <div 
        v-for="(dayGroup, index) in groupedMenuItems" 
        :key="index" 
        class="lunch-menu-day">
        <h4 class="day-title">{{ $t(`days.${dayGroup.day.toLowerCase()}`) }}</h4>
        <div class="day-items">
          <div 
            v-for="item in dayGroup.items" 
            :key="item.order" 
            class="lunch-menu-item">
            <div class="item-header">
              <h5 class="item-name">{{ item.name[$i18n.locale] }}</h5>
              <span class="item-price">€{{ item.price.toFixed(2) }}</span>
            </div>
            <p class="item-description">{{ item.description[$i18n.locale] }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps({
  isFullPage: {
    type: Boolean,
    default: false
  }
});

// Mock data - in real app this would come from the CMS
const currentMenu = ref({
  startDate: "2025-03-18",
  endDate: "2025-03-22",
  title: {
    en: "Spring Special Week",
    de: "Frühlings-Spezialwoche"
  },
  items: [
    {
      day: "Monday",
      name: {
        en: "Mushroom Risotto",
        de: "Pilzrisotto"
      },
      description: {
        en: "Creamy arborio rice with seasonal mushrooms",
        de: "Cremiger Arborio-Reis mit Saisonpilzen"
      },
      price: 9.90,
      order: 1
    },
    {
      day: "Monday",
      name: {
        en: "Tomato Soup",
        de: "Tomatensuppe"
      },
      description: {
        en: "Classic tomato soup with basil and croutons",
        de: "Klassische Tomatensuppe mit Basilikum und Croutons"
      },
      price: 6.90,
      order: 2
    },
    {
      day: "Tuesday",
      name: {
        en: "Chicken Curry",
        de: "Hähnchen-Curry"
      },
      description: {
        en: "Tender chicken pieces in a mild curry sauce with rice",
        de: "Zarte Hähnchenstücke in milder Currysauce mit Reis"
      },
      price: 10.90,
      order: 1
    },
    {
      day: "Tuesday",
      name: {
        en: "Vegetable Quiche",
        de: "Gemüsequiche"
      },
      description: {
        en: "Homemade quiche with seasonal vegetables and a side salad",
        de: "Hausgemachte Quiche mit Saisongemüse und Beilagensalat"
      },
      price: 8.90,
      order: 2
    },
    {
      day: "Wednesday",
      name: {
        en: "Beef Goulash",
        de: "Rindergulasch"
      },
      description: {
        en: "Slow-cooked beef goulash with potatoes and vegetables",
        de: "Langsam gegarter Rindergulasch mit Kartoffeln und Gemüse"
      },
      price: 11.90,
      order: 1
    },
    {
      day: "Wednesday",
      name: {
        en: "Stuffed Bell Peppers",
        de: "Gefüllte Paprika"
      },
      description: {
        en: "Bell peppers stuffed with rice, vegetables, and feta cheese",
        de: "Paprika gefüllt mit Reis, Gemüse und Feta-Käse"
      },
      price: 9.90,
      order: 2
    },
    {
      day: "Thursday",
      name: {
        en: "Fish & Chips",
        de: "Fish & Chips"
      },
      description: {
        en: "Crispy fried fish with potato wedges and homemade tartar sauce",
        de: "Knusprig gebratener Fisch mit Kartoffelspalten und hausgemachter Tartarsauce"
      },
      price: 12.90,
      order: 1
    },
    {
      day: "Thursday",
      name: {
        en: "Pasta Primavera",
        de: "Pasta Primavera"
      },
      description: {
        en: "Penne with spring vegetables in a light cream sauce",
        de: "Penne mit Frühlingsgemüse in leichter Sahnesauce"
      },
      price: 8.90,
      order: 2
    },
    {
      day: "Friday",
      name: {
        en: "Wiener Schnitzel",
        de: "Wiener Schnitzel"
      },
      description: {
        en: "Traditional breaded veal schnitzel with potato salad",
        de: "Traditionelles paniertes Kalbsschnitzel mit Kartoffelsalat"
      },
      price: 13.90,
      order: 1
    },
    {
      day: "Friday",
      name: {
        en: "Spinach Lasagna",
        de: "Spinat-Lasagne"
      },
      description: {
        en: "Homemade lasagna with spinach, ricotta, and tomato sauce",
        de: "Hausgemachte Lasagne mit Spinat, Ricotta und Tomatensauce"
      },
      price: 9.90,
      order: 2
    }
  ]
});

// Group menu items by day
const groupedMenuItems = computed(() => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // If not full page, only show current day or first 3 days
  let daysToShow = props.isFullPage ? days : days.slice(0, 3);
  
  return daysToShow.map(day => {
    const dayItems = currentMenu.value.items
      .filter(item => item.day === day)
      .sort((a, b) => a.order - b.order);
    
    return {
      day,
      items: dayItems
    };
  });
});

// Format date range
const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const options: Intl.DateTimeFormatOptions = { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric' 
  };
  
  return `${start.toLocaleDateString(undefined, options)} - ${end.toLocaleDateString(undefined, options)}`;
};
</script>

<style scoped>
.lunch-menu {
  margin-bottom: var(--spacing-2xl);
}

.lunch-menu-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.lunch-menu-title {
  margin-bottom: var(--spacing-xs);
}

.lunch-menu-dates {
  color: var(--color-text-light);
  font-style: italic;
}

.lunch-menu-days {
  display: grid;
  gap: var(--spacing-lg);
  grid-template-columns: repeat(3, 1fr);
}

.lunch-menu-days.full-page {
  grid-template-columns: repeat(5, 1fr);
}

.lunch-menu-day {
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
}

.day-title {
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-primary);
  text-align: center;
}

.day-items {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.lunch-menu-item {
  margin-bottom: var(--spacing-md);
}

.item-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-xs);
}

.item-name {
  margin-bottom: 0;
  font-weight: 600;
}

.item-price {
  font-weight: 600;
  color: var(--color-primary);
}

.item-description {
  color: var(--color-text-light);
  font-size: var(--font-size-sm);
}

@media (max-width: 1024px) {
  .lunch-menu-days, .lunch-menu-days.full-page {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .lunch-menu-days, .lunch-menu-days.full-page {
    grid-template-columns: 1fr;
  }
}
</style>