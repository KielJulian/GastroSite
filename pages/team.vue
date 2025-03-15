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
          <TeamGrid />
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.team-hero {
  height: 40vh;
  min-height: 300px;
  background-color: var(--color-accent);
}
</style>