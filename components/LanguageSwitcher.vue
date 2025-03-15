<template>
  <div class="language-switcher">
    <select v-model="$i18n.locale" @change="switchLanguage">
      <option v-for="locale in availableLocales" :key="locale.code" :value="locale.code">
        {{ locale.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { locale, locales } = useI18n();
const availableLocales = computed(() => 
  (locales.value as Array<{ code: string; name: string }>)
);

function switchLanguage() {
  // The route change is handled automatically by Nuxt i18n
}
</script>

<style scoped>
.language-switcher {
  display: inline-block;
}

select {
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  border: 1px solid var(--color-border);
  background-color: var(--color-background);
  cursor: pointer;
}
</style>