<template>
  <section class="section contact-section">
    <div class="container">
      <h2 class="section-title">{{ $t('home.contact.title') }}</h2>
      <div class="grid grid-2">
        <div class="contact-info">
          <h3>{{ $t('home.contact.findUs') }}</h3>
          <address>
            <p>Musterstraße 123<br>12345 Musterstadt</p>
            <p>Tel: +49 123 456789</p>
            <p>Email: info@gastrosite.com</p>
          </address>
          <div class="hours">
            <h3>{{ $t('home.contact.openingHours') }}</h3>
            <p>{{ $t('home.contact.monFri') }}: 11:00 - 22:00</p>
            <p>{{ $t('home.contact.satSun') }}: 12:00 - 23:00</p>
          </div>
        </div>
        <div class="map-container">
          <h3>{{ $t('home.contact.location') }}</h3>
          <div class="google-map">
            <!-- Google Maps iframe would go here -->
            <div class="map-placeholder">Google Maps Embed</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// No specific script needed for this component
</script>

<style scoped>
.contact-section {
  background-color: var(--color-background);
}

.contact-info, .map-container {
  padding: var(--spacing-lg);
}

.google-map {
  width: 100%;
  height: 400px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  margin-top: var(--spacing-md);
}

.map-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  color: #666;
  font-size: 18px;
}

@media (max-width: 767px) {
  .contact-section .grid {
    grid-template-columns: 1fr;
  }
}
</style>