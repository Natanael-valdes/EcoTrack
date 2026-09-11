<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Estado reactivo para los checkboxes (reemplaza document.querySelectorAll)
const tieneAlergia = ref(null); // null = sin seleccionar, true = sí, false = no

// Campos del formulario
const nombre = ref("");
const apellido = ref("");
const fechaNacimiento = ref("");
const email = ref("");
const alergias = ref("");

function seleccionarAlergia(valor) {
  // Comportamiento tipo radio: solo uno puede estar activo
  tieneAlergia.value = valor;
}

function enviarFormulario() {
  alert("Volunteer form sent successfully!");
  router.push("/home");
}
</script>

<template>
  <div class="page-wrapper">
    <div class="contenedor-base">
      <!-- Encabezado -->
      <div class="form-header">
        <h3>Join as a Volunteer</h3>
        <p class="form-subtitle">Help us make a difference in your community</p>
      </div>

      <form @submit.prevent="enviarFormulario" class="formulario-log">
        <!-- Nombre y Apellido en fila -->
        <div class="input-row">
          <div class="input-group">
            <label>Name</label>
            <input
              v-model="nombre"
              type="text"
              placeholder="Your name"
              class="cajita-texto"
              required
            />
          </div>
          <div class="input-group">
            <label>Last Name</label>
            <input
              v-model="apellido"
              type="text"
              placeholder="Your last name"
              class="cajita-texto"
              required
            />
          </div>
        </div>

        <!-- Fecha de nacimiento -->
        <div class="input-group full">
          <label>Date of Birth</label>
          <input
            v-model="fechaNacimiento"
            type="date"
            class="cajita-texto"
            required
          />
        </div>

        <!-- Email -->
        <div class="input-group full">
          <label>Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="example@gmail.com"
            class="cajita-texto"
            required
          />
        </div>

        <!-- Alergias -->
        <div class="allergy-section">
          <p class="allergy-label">Do you have any allergies?</p>
          <div class="allergy-options">
            <label
              class="option-btn"
              :class="{ selected: tieneAlergia === true }"
              @click="seleccionarAlergia(true)"
            >
              <input type="checkbox" :checked="tieneAlergia === true" hidden />
              ✓ Yes
            </label>
            <label
              class="option-btn"
              :class="{ selected: tieneAlergia === false }"
              @click="seleccionarAlergia(false)"
            >
              <input type="checkbox" :checked="tieneAlergia === false" hidden />
              ✗ No
            </label>
          </div>

          <!-- Campo extra si selecciona Sí (reemplaza display:none con v-if) -->
          <div v-if="tieneAlergia === true" class="extra-field">
            <input
              v-model="alergias"
              type="text"
              placeholder="Describe your allergies..."
              class="cajita-texto"
            />
          </div>
        </div>

        <input type="submit" value="Send Application" class="botoncito" />
      </form>

      <router-link to="/home" class="textoUnderline"
        >← Back to Home</router-link
      >
    </div>
  </div>
</template>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
}

.contenedor-base {
  background-color: white;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  padding: 40px;
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
}

/* Encabezado del formulario */
.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-header h3 {
  font-size: 1.6rem;
  color: #2d5a27;
  margin: 0 0 8px 0;
}

.form-subtitle {
  color: #777;
  font-size: 0.95rem;
  margin: 0;
}

/* Formulario */
.formulario-log {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

/* Fila de dos columnas */
.input-row {
  display: flex;
  gap: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.input-group.full {
  width: 100%;
}

.input-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
  margin-bottom: 6px;
}

/* Inputs */
.cajita-texto {
  height: 42px;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  margin-bottom: 15px;
  padding: 0 14px;
  font-size: 15px;
  transition: border-color 0.2s ease;
  width: 100%;
  box-sizing: border-box;
}

.cajita-texto:focus {
  outline: none;
  border-color: #2d935e;
  box-shadow: 0 0 0 3px rgba(45, 147, 94, 0.1);
}

/* Sección de alergias */
.allergy-section {
  margin-bottom: 15px;
}

.allergy-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #444;
  margin: 0 0 10px 0;
}

.allergy-options {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.option-btn {
  flex: 1;
  text-align: center;
  padding: 10px;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
  color: #555;
  transition: all 0.2s ease;
  user-select: none;
}

.option-btn:hover {
  border-color: #2d935e;
  color: #2d935e;
}

.option-btn.selected {
  background-color: #eef7ed;
  border-color: #2d935e;
  color: #2d935e;
}

.extra-field {
  animation: fadeIn 0.25s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Botón enviar */
.botoncito {
  height: 48px;
  background-color: #2d935e;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 20px;
  transition:
    background-color 0.3s,
    transform 0.2s;
}

.botoncito:hover {
  background-color: #267a4d;
  transform: translateY(-2px);
}

/* Link de regreso */
.textoUnderline {
  text-align: center;
  display: block;
  color: #555;
  font-weight: 500;
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s;
}

.textoUnderline:hover {
  color: #2d935e;
  text-decoration: underline;
}

/* Responsivo */
@media (max-width: 500px) {
  .input-row {
    flex-direction: column;
    gap: 0;
  }
  .contenedor-base {
    padding: 25px 20px;
  }
}
</style>
