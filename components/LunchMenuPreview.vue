<template>
  <div class="lunch-menu" v-if="currentMenu">
    <div class="lunch-menu-header">
      <h3 class="lunch-menu-title">{{ currentMenu.title }}</h3>
      <p class="lunch-menu-dates">{{ formatDateRange(currentMenu.startDate, currentMenu.endDate) }}</p>
    </div>
    
    <div class="lunch-menu-days" :class="{ 'full-page': isFullPage }">
      <div 
        v-for="(dayGroup, index) in groupedMenuItems" 
        :key="index" 
        class="lunch-menu-day">
        <h4 class="day-title">{{ dayGroup.day }}</h4>
        <div class="day-items">
          <div 
            v-for="item in dayGroup.items" 
            :key="item.order" 
            class="lunch-menu-item">
            <div class="item-header">
              <h5 class="item-name">{{ item.name }}</h5>
              <span class="item-price">€{{ item.price.toFixed(2) }}</span>
            </div>
            <p class="item-description">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="lunch-menu-loading">
    <p>Loading content...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

interface MenuItem {
  day: string;
  name: string;
  description: string;
  price: number;
  order: number;
}

interface LunchMenu {
  startDate: string;
  endDate: string;
  title: string;
  items: MenuItem[];
}

const props = defineProps({
  isFullPage: {
    type: Boolean,
    default: false
  }
});

// Sample data since we removed i18n functionality
const currentMenu = ref<LunchMenu>({
  startDate: "2025-03-18",
  endDate: "2025-03-22",
  title: "Spring Special Week",
  items: [
    {
      day: "Monday",
      name: "Mushroom Risotto",
      description: "Creamy arborio rice with seasonal mushrooms",
      price: 9.90,
      order: 1
    },
    {
      day: "Monday",
      name: "Tomato Soup",
      description: "Classic tomato soup with basil and croutons",
      price: 6.90,
      order: 2
    },
    {
      day: "Tuesday",
      name: "Chicken Curry",
      description: "Tender chicken pieces in a mild curry sauce with rice",
      price: 10.90,
      order: 1
    },
    {
      day: "Tuesday",
      name: "Vegetable Quiche",
      description: "Homemade quiche with seasonal vegetables and a side salad",
      price: 8.90,
      order: 2
    },
    {
      day: "Wednesday",
      name: "Beef Stroganoff",
      description: "Tender beef strips in a creamy mushroom sauce with pasta",
      price: 12.90,
      order: 1
    },
    {
      day: "Wednesday",
      name: "Greek Salad",
      description: "Fresh vegetables with feta cheese and olives",
      price: 7.90,
      order: 2
    },
    {
      day: "Thursday",
      name: "Fish & Chips",
      description: "Battered cod with crispy fries and tartar sauce",
      price: 11.90,
      order: 1
    },
    {
      day: "Thursday",
      name: "Minestrone Soup",
      description: "Italian vegetable soup with pasta and beans",
      price: 6.90,
      order: 2
    },
    {
      day: "Friday",
      name: "Lasagna",
      description: "Homemade beef lasagna with a side salad",
      price: 10.90,
      order: 1
    },
    {
      day: "Friday",
      name: "Caprese Salad",
      description: "Tomatoes, mozzarella, basil, and balsamic glaze",
      price: 8.90,
      order: 2
    }
  ]
});

// Group menu items by day
const groupedMenuItems = computed(() => {
  if (!currentMenu.value || !currentMenu.value.items) {
    return [];
  }
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  
  // If not full page, only show current day or first 3 days
  let daysToShow = props.isFullPage ? days : days.slice(0, 3);
  
  return daysToShow.map(day => {
    const dayItems = currentMenu.value!.items
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
  if (!startDate || !endDate) {
    return '';
  }
  
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

.lunch-menu-loading {
  text-align: center;
  padding: var(--spacing-xl);
  background-color: var(--color-background);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
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