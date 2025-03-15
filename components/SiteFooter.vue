<template>
  <footer class="footer">
    <div class="container">
      <div class="grid grid-1">
        <div class="footer-col text-center">
          <h3>GastroSite</h3>
          <p>GastroSite offers authentic cuisine in a cozy atmosphere. Visit us and enjoy a culinary journey.</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; {{ new Date().getFullYear() }} GastroSite. All rights reserved</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// No specific script needed for this component
</script>

<style scoped>
.footer {
  background-color: var(--color-text);
  color: white;
  padding: var(--spacing-2xl) 0;
  margin-top: var(--spacing-3xl);
}

.footer-col {
  margin-bottom: var(--spacing-xl);
}

.text-center {
  text-align: center;
}

.grid-1 {
  grid-template-columns: 1fr;
}

.footer-bottom {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
}
</style>