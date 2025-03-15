<template>
  <header>
    <div class="container">
      <nav class="nav">
        <div class="nav-logo">
          <NuxtLink :to="localePath('/')">
            <h1>GastroSite</h1>
          </NuxtLink>
        </div>
        <ul class="nav-links hide-desktop">
          <li>
            <NuxtLink :to="localePath('/menu')">{{ $t('navigation.menu') }}</NuxtLink>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
        <div class="nav-mobile hide-mobile">
          <button class="btn-menu" @click="toggleMobileMenu">
            Menu
          </button>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMobileMenuOpen = ref(false);
const localePath = useLocalePath();

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}
</script>

<style scoped>
/* Add any navbar-specific styles here */
</style>