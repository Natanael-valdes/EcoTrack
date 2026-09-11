<script setup></script>

<template>
  <!-- Secciones -->

  <section class="contenedor-tarjetas" id="Apartados">
    <a href="/tracky" class="tarjeta">
      <img src="../assets/IMG/story1.jpg" alt="Volunteering" />

      <h2>Tracky</h2>

      <p>TRack your activity to help the planet.</p>
    </a>

    <a href="/EcoNews" class="tarjeta">
      <img
        src="../assets/IMG/limpieza-rio-Andarax-1280x640.jpg"
        alt="Garbage Reports"
      />

      <h2>Garbage Reports</h2>

      <p>Report places where garbage has accumulated.</p>
    </a>

    <a href="/ecocraft" class="tarjeta">
      <img src="../assets/IMG/images.jpg" alt="EcoCraft" />

      <h2>EcoCraft</h2>

      <p>Learn to recycle by creating crafts with reusable materials.</p>
    </a>
  </section>
</template>

<style scoped>
.contenedor-tarjetas {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 60px;
  flex-wrap: wrap;
}

.tarjeta {
  width: 300px;
  background: white;
  border-radius: 15px;
  text-decoration: none;
  color: black;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  overflow: hidden;
}

.tarjeta:hover {
  transform: scale(1.05);
}

.tarjeta img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.tarjeta h2 {
  color: #2e8b57;
  text-align: center;
  margin: 15px;
}

.tarjeta p {
  text-align: center;
  padding: 0 20px 20px;
}
</style>
