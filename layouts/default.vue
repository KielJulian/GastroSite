<template>
  <div class="layout">
    <Navbar />

    <main>
      <slot />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
// No specific script needed for this component
</script>

<style>
/* Global styles moved to main.css */
</style>