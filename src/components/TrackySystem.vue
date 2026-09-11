<script setup>
import { ref, computed } from "vue";

// ─── Estado reactivo (reemplaza localStorage por ahora) ───
const points = ref(parseInt(localStorage.getItem("ecoPoints")) || 0);
const history = ref(JSON.parse(localStorage.getItem("ecoHistory")) || []);
const selectedAction = ref("10"); // valor por defecto del select

// ─── Acciones disponibles ───
const acciones = [
  { value: "10", label: "Reusable bottle / thermos (+10 pts)" },
  { value: "20", label: "Public transport or bike (+20 pts)" },
  { value: "25", label: "Recycled / Separated waste (+25 pts)" },
  { value: "50", label: "Planted a tree or cared for plants (+50 pts)" },
];

// ─── Nivel y badge calculados automáticamente según los puntos ───
const levelInfo = computed(() => {
  if (points.value >= 300) return { title: "Earth Guardian", badge: "🌍" };
  if (points.value >= 150) return { title: "Urban Forest", badge: "🌳" };
  if (points.value >= 50) return { title: "Eco Friend", badge: "🌿" };
  return { title: "Beginner", badge: "🌱" };
});

// ─── Medallas desbloqueadas ───
const badges = computed(() => [
  {
    id: 1,
    icon: "🌱",
    label: "Beginner",
    req: 10,
    unlocked: points.value >= 10,
  },
  {
    id: 2,
    icon: "🌿",
    label: "Eco Friend",
    req: 50,
    unlocked: points.value >= 50,
  },
  {
    id: 3,
    icon: "🌳",
    label: "Urban Forest",
    req: 150,
    unlocked: points.value >= 150,
  },
  {
    id: 4,
    icon: "🌍",
    label: "Earth Guardian",
    req: 300,
    unlocked: points.value >= 300,
  },
]);

// ─── Registrar una acción ───
function logAction() {
  const accion = acciones.find((a) => a.value === selectedAction.value);
  const pts = parseInt(accion.value);
  const texto = accion.label.split(" (")[0];

  points.value += pts;
  history.value.unshift({ text: texto, pts });

  // Guardar en localStorage
  localStorage.setItem("ecoPoints", points.value);
  localStorage.setItem("ecoHistory", JSON.stringify(history.value));
}
</script>

<template>
  <main class="tracker-container">
    <h1 class="tracker-title">Eco Action Tracker</h1>

    <!-- Tarjeta de Estado -->
    <div class="tracker-card status-card">
      <div class="user-badge">{{ levelInfo.badge }}</div>
      <div class="user-info">
        <h2>{{ levelInfo.title }}</h2>
        <p class="points-text">
          Total Points: <span>{{ points }}</span> pts
        </p>
      </div>
    </div>

    <!-- Formulario -->
    <div class="tracker-card">
      <h3>Register a Green Action</h3>
      <div class="action-form">
        <select v-model="selectedAction">
          <option
            v-for="accion in acciones"
            :key="accion.value"
            :value="accion.value"
          >
            {{ accion.label }}
          </option>
        </select>
        <button type="button" @click="logAction">Log Action</button>
      </div>
    </div>

    <!-- Medallas -->
    <div class="tracker-card">
      <h3>Badges & Achievements</h3>
      <div class="badges-grid">
        <div
          v-for="badge in badges"
          :key="badge.id"
          class="badge-item"
          :class="badge.unlocked ? 'unlocked' : 'locked'"
        >
          <span class="badge-icon">{{ badge.icon }}</span>
          <p>{{ badge.label }}</p>
          <small>Reach {{ badge.req }} pts</small>
        </div>
      </div>
    </div>

    <!-- Historial -->
    <div class="tracker-card">
      <h3>Recent Activity</h3>
      <ul class="history-list">
        <li v-if="history.length === 0" class="empty-msg">
          No actions registered yet.
        </li>
        <li v-for="(item, i) in history" :key="i">
          <span>{{ item.text }}</span>
          <span class="history-pts">+{{ item.pts }} pts</span>
        </li>
      </ul>
    </div>
  </main>
</template>

<style scoped>
.tracker-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.tracker-title {
  text-align: center;
  color: #2d5a27;
  margin-bottom: 30px;
}

.tracker-card {
  background: #ffffff;
  border-radius: 12px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.tracker-card h3 {
  margin-top: 0;
  color: #2d5a27;
  border-bottom: 2px solid #eef7ed;
  padding-bottom: 10px;
}

/* Tarjeta de Nivel y Puntos */
.status-card {
  display: flex;
  align-items: center;
  gap: 20px;
  background: linear-gradient(135deg, #eef7ed 0%, #d8ebd6 100%);
}

.user-badge {
  font-size: 3.5rem;
  background: #ffffff;
  padding: 15px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.user-info h2 {
  margin: 0;
  color: #2d5a27;
  font-size: 1.6rem;
}

.points-text {
  margin: 5px 0 0 0;
  font-size: 1.1rem;
  color: #444;
}

.points-text span {
  font-weight: bold;
  color: #2d5a27;
  font-size: 1.3rem;
}

/* Formulario */
.action-form {
  display: flex;
  gap: 15px;
  margin-top: 15px;
  flex-wrap: wrap;
}

.action-form select {
  flex: 1;
  min-width: 200px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.action-form button {
  background-color: #2d5a27;
  color: #fff;
  border: none;
  padding: 12px 25px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.action-form button:hover {
  background-color: #1e3d1a;
}

/* Grilla de Emblemas */
.badges-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.badge-item {
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  background: #f9f9f9;
  border: 1px solid #eee;
  transition: all 0.3s ease;
}

.badge-item .badge-icon {
  font-size: 2.2rem;
  display: block;
}

.badge-item p {
  margin: 8px 0 2px 0;
  font-weight: bold;
  font-size: 0.95rem;
}

.badge-item small {
  color: #777;
}

/* Estilo para Emblemas Bloqueados */
.badge-item.locked {
  opacity: 0.4;
  filter: grayscale(100%);
}

.badge-item.unlocked {
  opacity: 1;
  filter: grayscale(0%);
  background: #eef7ed;
  border-color: #a8e6cf;
}

/* Historial */
.history-list {
  list-style: none;
  padding: 0;
  margin: 15px 0 0 0;
}

.history-list li {
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
}

.history-list li:last-child {
  border-bottom: none;
}

.history-pts {
  font-weight: bold;
  color: #2d5a27;
}
</style>
