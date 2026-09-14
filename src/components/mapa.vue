<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

/* =========================================================
   DATOS
   ========================================================= */
const trucks = ref([
  { id: "EA-021", status: "🟢 Active" },
  { id: "EA-034", status: "🟢 Active" },
  { id: "EA-018", status: "🟡 Next Route" },
]);

const recyclingCenters = ref(["Santa Ana Center", "Metrocentro"]);

const reports = ref([
  { place: "Parque Libertad", issue: "Garbage accumulation" },
  { place: "Mercado Central", issue: "Full container" },
  { place: "Lago de Coatepeque", issue: "Plastic waste" },
]);

const statistics = ref({
  trucks: 5,
  volunteers: 185,
  recycled: "18,540 kg",
});

/* =========================================================
   ESTADO DE LOS ACORDEONES (solo afecta en móvil)
   ========================================================= */
const leftOpen = ref(false);
const rightOpen = ref(false);

/* =========================================================
   LEAFLET
   ========================================================= */
const mapContainer = ref(null);
let map = null;

onMounted(() => {
  if (map) return;

  map = L.map(mapContainer.value).setView([13.9945, -89.5597], 13);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
  }).addTo(map);

  L.marker([13.9945, -89.5597])
    .addTo(map)
    .bindPopup("<b>EcoTrack</b><br>Santa Ana");
});

onBeforeUnmount(() => {
  if (map) {
    map.remove();
    map = null;
  }
});
</script>

<template>
  <div class="contenedor-map">
    <!-- ============ Panel izquierdo ============ -->
    <aside class="izquierda-map" :class="{ 'is-open': leftOpen }">
      <button
        type="button"
        class="panel-toggle"
        :aria-expanded="leftOpen"
        @click="leftOpen = !leftOpen"
      >
        <span>Trucks & Centers</span>
        <span class="chevron">▾</span>
      </button>

      <div class="panel-content">
        <h2>Trucks</h2>
        <div v-for="truck in trucks" :key="truck.id" class="card">
          Truck {{ truck.id }}
          <br />
          {{ truck.status }}
        </div>

        <h2>Recycling Centers</h2>
        <div v-for="center in recyclingCenters" :key="center" class="card">
          {{ center }}
        </div>
      </div>
    </aside>

    <!-- ============ Mapa ============ -->
    <main>
      <div class="tituloMapa">
        <h2>EcoTrack Live Map</h2>
        <p>Real-time garbage truck routes in Santa Ana, El Salvador.</p>
      </div>

      <div ref="mapContainer" class="leaflet-map"></div>
    </main>

    <!-- ============ Panel derecho ============ -->
    <aside class="derecha-map" :class="{ 'is-open': rightOpen }">
      <button
        type="button"
        class="panel-toggle"
        :aria-expanded="rightOpen"
        @click="rightOpen = !rightOpen"
      >
        <span>Reports & Stats</span>
        <span class="chevron">▾</span>
      </button>

      <div class="panel-content">
        <h2>⚠ Reports</h2>
        <div v-for="r in reports" :key="r.place" class="card">
          {{ r.place }}
          <br />
          {{ r.issue }}
        </div>

        <h2>Statistics</h2>
        <div class="card">
          Trucks: {{ statistics.trucks }} <br /><br />
          Volunteers: {{ statistics.volunteers }} <br /><br />
          Recycled: {{ statistics.recycled }}
        </div>
      </div>
    </aside>
  </div>
</template>

<style scoped>
/* =========================================================
   TU CSS ORIGINAL INTACTO
   ========================================================= */
.contenedor-map {
  width: 95%;
  margin: 25px auto;
  display: grid;
  grid-template-columns: 270px 1fr 270px;
  gap: 20px;
}

.izquierda-map,
.derecha-map {
  background: white;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.izquierda-map,
.derecha-map {
  color: #2e7d32;
  margin-bottom: 15px;
}

.card {
  background: #f4fff4;
  border-left: 6px solid #43a047;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.tituloMapa {
  text-align: center;
  margin-bottom: 20px;
}

.leaflet-map {
  width: 100%;
  height: 650px;
  border-radius: 15px;
  overflow: hidden;
  z-index: 0;
}

/* =========================================================
   NUEVO: Acordeón (por defecto está oculto el botón,
   porque en desktop no hace falta)
   ========================================================= */
.panel-toggle {
  display: none; /* se activa solo en móvil */
}

/* =========================================================
   RESPONSIVE → móvil / tablet
   ========================================================= */
@media (max-width: 900px) {
  .contenedor-map {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  /* Reordena: primero el mapa, luego los paneles */
  main {
    order: 1;
  }
  .izquierda-map {
    order: 2;
  }
  .derecha-map {
    order: 3;
  }

  .leaflet-map {
    height: 420px;
  }

  /* El panel se ve como una tarjeta con botón cabecera */
  .izquierda-map,
  .derecha-map {
    padding: 0; /* el padding lo lleva el contenido */
    overflow: hidden;
  }

  /* Botón de la cabecera del acordeón */
  .panel-toggle {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 15px 20px;
    background: #eef7ed;
    border: none;
    border-left: 6px solid #43a047;
    font-size: 1rem;
    font-weight: 700;
    color: #2e7d32;
    cursor: pointer;
    text-align: left;
    transition: background 0.2s ease;
  }

  .panel-toggle:hover {
    background: #dff0df;
  }

  .panel-toggle .chevron {
    font-size: 1.1rem;
    transition: transform 0.25s ease;
  }

  /* La flechita gira cuando el panel está abierto */
  .izquierda-map.is-open .chevron,
  .derecha-map.is-open .chevron {
    transform: rotate(180deg);
  }

  /* Contenido: oculto por defecto en móvil */
  .panel-content {
    display: none;
    padding: 20px;
    animation: slideDown 0.25s ease;
  }

  /* Se muestra solo si el panel tiene la clase .is-open */
  .izquierda-map.is-open .panel-content,
  .derecha-map.is-open .panel-content {
    display: block;
  }
}

/* En desktop el contenido siempre visible */
@media (min-width: 901px) {
  .panel-content {
    display: block;
  }
}

/* Animación de apertura */
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
