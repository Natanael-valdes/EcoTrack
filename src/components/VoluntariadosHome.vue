<script setup>
import { useRouter } from "vue-router";

// 1) Traemos el router para poder navegar
const router = useRouter();

// 2) Reemplaza tu BotonMover()
function btonsubir() {
  router.push("/formVol");
}
</script>

<template>
  <section id="voluntariado" class="voluntariado">
    <h1>EcoTrack Volunteering</h1>

    <p class="intro">
      Join our environmental community and help make El Salvador a cleaner and
      greener place.
    </p>

    <div class="contenedorVoluntariado">
      <div class="actividad">
        <h2>Tree Planting</h2>

        <p>
          Participate in tree planting campaigns in parks, schools and protected
          areas.
        </p>

        <button @click.prevent="btonsubir">Join</button>
      </div>

      <div class="actividad">
        <h2>Street Clean-up</h2>

        <p>
          Help clean streets, rivers, lakes and tourist areas with other
          volunteers.
        </p>

        <button @click.prevent="btonsubir">Join</button>
      </div>

      <div class="actividad">
        <h2>Recycling Campaign</h2>

        <p>
          Collect plastic, paper and glass to promote recycling in your
          community.
        </p>

        <button @click.prevent="btonsubir">Join</button>
      </div>
    </div>

    <div class="informacion">
      <h2>Upcoming Event</h2>

      <p><strong>Location:</strong> Parque Libertad, Santa Ana</p>

      <p><strong>Date:</strong> Saturday, July 18</p>

      <p><strong>Time:</strong> 8:00 AM</p>

      <p>
        <strong>Bring:</strong> Gloves, water bottle and comfortable clothes.
      </p>
    </div>
  </section>
</template>

<style scoped>
.voluntariado {
  width: 90%;
  margin: 70px auto;
  text-align: center;
}

.voluntariado h1 {
  color: #2e7d32;
  font-size: 40px;
  margin-bottom: 15px;
}

.intro {
  font-size: 18px;
  color: #555;
  margin-bottom: 40px;
}

.contenedorVoluntariado {
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
}

.actividad {
  width: 300px;
  background: white;
  border-radius: 15px;
  padding: 25px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: 0.3s;
}

.actividad:hover {
  transform: translateY(-8px);
}

.actividad h2 {
  color: #2e7d32;
  margin-bottom: 15px;
}

.actividad p {
  margin-bottom: 20px;
}

.actividad button {
  background: #2e7d32;
  color: white;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.actividad button:hover {
  background: #1b5e20;
}

.informacion {
  margin-top: 50px;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.informacion h2 {
  color: #2e7d32;
  margin-bottom: 20px;
}

.informacion p {
  margin: 10px 0;
}
</style>
