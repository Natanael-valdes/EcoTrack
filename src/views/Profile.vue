<script setup>
import Encabezado from "../components/Encabezado.vue";
import Footer from "../components/Footer.vue";
import ProfileCard from "../components/ProfileCard.vue";
</script>

<template>
  <encabezado />

  <main class="profile-view">
    <profile-card />
  </main>

  <Footer />
</template>

<style scoped>
.profile-view {
  min-height: calc(100vh - 160px);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #eef7ed 0%, #f7fbf7 100%);
  padding: 3rem 1.25rem;
}
</style>
