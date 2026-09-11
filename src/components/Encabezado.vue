<script setup>
import { ref } from "vue";

const menuItems = [
  { nombre: "Home", ruta: "/home" },
  { nombre: "EcoNews", ruta: "/EcoNews" },
  { nombre: "EcoCraft", ruta: "/ecocraft" },
  { nombre: "Map", ruta: "/map" },
  { nombre: "About Us", ruta: "/about" },
  { nombre: "Profile", ruta: "/profile" },
];

const menuAbierto = ref(false);
function toggleMenu() {
  menuAbierto.value = !menuAbierto.value;
}
</script>

<template>
  <nav class="navbar">
    <div class="logo">EcoTrack</div>

    <button class="hamburger" @click="toggleMenu">☰</button>

    <ul class="nav-links" :class="{ open: menuAbierto }">
      <li v-for="item in menuItems" :key="item.ruta">
        <router-link :to="item.ruta">{{ item.nombre }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2f4f2f;
  padding: 20px 40px;
  position: relative;
  z-index: 100;
}
.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .hamburger {
    display: block;
  }
  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #2f4f2f;
    padding: 20px;
  }
  .nav-links.open {
    display: flex;
  }
}
</style>
