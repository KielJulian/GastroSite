<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1>Welcome to GastroSite</h1>
        <p>Experience authentic cuisine in a cozy atmosphere</p>
        <NuxtLink to="/menu" class="btn btn-primary">
          View Our Menu
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No script needed
</script>

<style scoped>
.hero {
  height: 70vh;
  min-height: 500px;
  /* background-image: url('/images/hero-bg.jpg'); */
  background-color: var(--color-primary);
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  position: relative;
  color: white;
  text-align: center;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 700px;
  margin: 0 auto;
}

.hero h1 {
  font-size: var(--font-size-4xl);
  margin-bottom: var(--spacing-lg);
}

.hero p {
  font-size: var(--font-size-xl);
  margin-bottom: var(--spacing-xl);
}
</style>