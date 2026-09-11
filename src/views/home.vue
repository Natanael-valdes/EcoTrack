<script setup>
import ApartadosHome from "../components/ApartadosHome.vue";
import Carrusel from "../components/Carrusel.vue";
import Encabezado from "../components/Encabezado.vue";
import Footer from "../components/Footer.vue";
import PostFeed from "../components/PostFeed.vue";
import VoluntariadosHome from "../components/VoluntariadosHome.vue";
</script>

<template>
  <Encabezado />
  <Carrusel />
  <ApartadosHome />
  <VoluntariadosHome />
  <h2>Last Posts</h2>
  <PostFeed :limit="3" />
  <a href="/EcoNews">Go to see all post of the EcoComunity!</a>
  <Footer />
</template>

<style scoped>
h2 {
  color: #2e7d32;
  margin-bottom: 15px;
  margin-left: 45%;
}

a {
  text-decoration: none;
  color: black;
  margin-left: 39%;
  font-weight: 400;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  h2 {
    margin-left: 35%;
  }

  a {
    margin-left: 15%;
  }
}
</style>
