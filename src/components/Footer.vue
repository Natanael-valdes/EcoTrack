<script setup>
const redes = [
  {
    nombre: "Instagram",
    url: "https://www.instagram.com/ecotrack_ma?igsh=MXRhZ2M2NGR2emR3cQ==",
  },
  { nombre: "TikTok", url: "https://www.tiktok.com/@ecotrak2" },
];
</script>

<template>
  <footer class="main-footer">
    <div class="footer-container">
      <!-- Columna 1: Branding -->
      <div class="footer-section brand-info">
        <h3>EcoTrack</h3>
        <p>Empowering communities to live sustainably, one step at a time.</p>
      </div>

      <!-- Columna 2: Redes sociales -->
      <div class="footer-section footer-links">
        <h4>Our Social Media</h4>
        <ul>
          <li v-for="red in redes" :key="red.nombre">
            <a :href="red.url" target="_blank" rel="noopener">{{
              red.nombre
            }}</a>
          </li>
        </ul>
      </div>

      <!-- Columna 3: Frase -->
      <div class="footer-section footer-contact">
        <h4>Join the Movement</h4>
        <p>Let's help the planet together, one Track at a time.</p>
      </div>
    </div>

    <!-- Barra de Copyright -->
    <div class="footer-bottom">
      <p>&copy; 2026 EcoTrack. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.main-footer {
  background-color: #2d5a27;
  color: #ffffff;
  padding-top: 40px;
  margin-top: 60px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.footer-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 20px 30px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
}

.footer-section {
  flex: 1;
  min-width: 220px;
}

.footer-section h3 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #a8e6cf;
}

.footer-section h4 {
  font-size: 1.1rem;
  margin-bottom: 12px;
  color: #a8e6cf;
}

.footer-section p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: #e0e0e0;
}

.footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: #ffffff;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-links a:hover {
  color: #a8e6cf;
  text-decoration: underline;
}

.footer-bottom {
  text-align: center;
  padding: 15px 20px;
  font-size: 0.85rem;
  color: #cccccc;
}
</style>
