<template>
  <NuxtLayout name="default">
    <div>
      <!-- Hero Section -->
      <section class="hero contact-hero">
        <div class="container">
          <div class="hero-content">
            <h1>Contact Us</h1>
            <p>Get in touch with us for reservations or inquiries</p>
          </div>
        </div>
      </section>

      <!-- Contact Section -->
      <section class="section">
        <div class="container">
          <div class="grid grid-2">
            <div class="contact-info">
              <h2>Find Us</h2>
              <address>
                <p>Musterstraße 123<br>12345 Musterstadt</p>
                <p>Tel: +49 123 456789</p>
                <p>Email: info@gastrosite.com</p>
              </address>
              <div class="hours">
                <h3>Opening Hours</h3>
                <p>Monday - Friday: 11:00 - 22:00</p>
                <p>Saturday - Sunday: 12:00 - 23:00</p>
              </div>
            </div>
            <div class="map-container">
              <h2>Location</h2>
              <div class="google-map">
                <!-- Google Maps iframe would go here -->
                <div class="map-placeholder">Google Maps Embed</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// No reservation functionality needed
</script>

<style scoped>
.contact-hero {
  height: 40vh;
  min-height: 300px;
  background-color: var(--color-secondary);
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
  .grid {
    grid-template-columns: 1fr;
  }

  .google-map {
    height: 300px;
  }
}
</style>