<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useTrackyStore } from "../stores/tracky";

const router = useRouter();
const authStore = useAuthStore();
const trackyStore = useTrackyStore();

const selectedAction = ref("10");
const submitting = ref(false);
const localError = ref("");

const acciones = [
  { value: "10", label: "Reusable bottle / thermos (+10 pts)" },
  { value: "20", label: "Public transport or bike (+20 pts)" },
  { value: "25", label: "Recycled / Separated waste (+25 pts)" },
  { value: "50", label: "Planted a tree or cared for plants (+50 pts)" },
];

/* =========================================================
   BADGES
   ========================================================= */
const badges = computed(() => [
  {
    id: 1,
    icon: "🌱",
    label: "Beginner",
    req: 10,
    unlocked: trackyStore.points >= 10,
  },
  {
    id: 2,
    icon: "🌿",
    label: "Eco Friend",
    req: 50,
    unlocked: trackyStore.points >= 50,
  },
  {
    id: 3,
    icon: "🌳",
    label: "Urban Forest",
    req: 150,
    unlocked: trackyStore.points >= 150,
  },
  {
    id: 4,
    icon: "🌍",
    label: "Earth Guardian",
    req: 300,
    unlocked: trackyStore.points >= 300,
  },
]);

/* =========================================================
   REGISTRAR ACCIÓN
   ========================================================= */
async function logAction() {
  localError.value = "";

  if (!authStore.isAuthenticated) {
    localError.value = "Debes iniciar sesión para registrar acciones";
    return;
  }

  const accion = acciones.find((a) => a.value === selectedAction.value);
  if (!accion) return;

  const pts = parseInt(accion.value);
  const label = accion.label.split(" (")[0];

  submitting.value = true;

  try {
    await trackyStore.logAction(label, pts);
  } catch (err) {
    localError.value = err.message || "Error al registrar la acción";
  } finally {
    submitting.value = false;
  }
}

function irALogin() {
  router.push("/login");
}

/* =========================================================
   CARGAR AL MONTAR
   ========================================================= */
onMounted(() => {
  if (authStore.isAuthenticated) {
    trackyStore.loadTracky();
  }
});
</script>

<template>
  <main class="tracker-container">
    <h1 class="tracker-title">Eco Action Tracker</h1>

    <!-- ===== SIN SESIÓN ===== -->
    <div v-if="!authStore.isAuthenticated" class="tracker-card guest-card">
      <span class="guest-icon"></span>
      <h3>Inicia sesión para usar el Tracker</h3>
      <p>Necesitas una cuenta para guardar tus puntos y medallas.</p>
      <button class="login-btn" @click="irALogin">Iniciar sesión</button>
    </div>

    <!-- ===== CON SESIÓN ===== -->
    <template v-else>
      <!-- Estado -->
      <div class="tracker-card status-card">
        <div class="user-badge">{{ trackyStore.levelInfo.badge }}</div>
        <div class="user-info">
          <h2>{{ trackyStore.levelInfo.title }}</h2>
          <p class="points-text">
            Total Points: <span>{{ trackyStore.points }}</span> pts
          </p>
        </div>
      </div>

      <!-- Formulario -->
      <div class="tracker-card">
        <h3>Register a Green Action</h3>
        <div class="action-form">
          <select v-model="selectedAction" :disabled="submitting">
            <option
              v-for="accion in acciones"
              :key="accion.value"
              :value="accion.value"
            >
              {{ accion.label }}
            </option>
          </select>
          <button type="button" :disabled="submitting" @click="logAction">
            {{ submitting ? "Saving..." : "Log Action" }}
          </button>
        </div>
        <p v-if="localError" class="error-msg">{{ localError }}</p>
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
          <li v-if="trackyStore.history.length === 0" class="empty-msg">
            No actions registered yet.
          </li>
          <li v-for="item in trackyStore.history" :key="item.id">
            <span>{{ item.label }}</span>
            <span class="history-pts">+{{ item.points }} pts</span>
          </li>
        </ul>
      </div>
    </template>
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

/* ===== Guest ===== */
.guest-card {
  text-align: center;
  padding: 3rem 1.5rem;
}

.guest-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.guest-card h3 {
  border: none;
  margin: 0 0 0.5rem;
  font-size: 1.2rem;
}

.guest-card p {
  color: #6b7280;
  margin: 0 0 1.5rem;
  font-size: 0.95rem;
}

.login-btn {
  background: #4caf50;
  color: white;
  border: none;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  font-size: 0.95rem;
  transition: background 0.2s ease;
}

.login-btn:hover {
  background: #388e3c;
}

/* ===== Status Card ===== */
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

/* ===== Formulario ===== */
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

.action-form button:hover:not(:disabled) {
  background-color: #1e3d1a;
}

.action-form button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.error-msg {
  margin: 12px 0 0;
  padding: 0.55rem 0.9rem;
  background: #fdecea;
  border: 1px solid #f5c6c2;
  border-radius: 8px;
  color: #b03a2e;
  font-size: 0.85rem;
  text-align: center;
}

/* ===== Badges ===== */
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

/* ===== Historial ===== */
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

.empty-msg {
  color: #888;
  justify-content: center !important;
  font-style: italic;
}

/* ===== Responsive ===== */
@media (max-width: 600px) {
  .status-card {
    flex-direction: column;
    text-align: center;
  }

  .action-form button {
    width: 100%;
  }
}
</style>
