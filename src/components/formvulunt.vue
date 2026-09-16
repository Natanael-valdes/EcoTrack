<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useVolunteersStore } from "../stores/volunteers";

const router = useRouter();
const authStore = useAuthStore();
const volunteersStore = useVolunteersStore();

/* =========================================================
   ESTADO DEL FORMULARIO
   ========================================================= */
const tieneAlergia = ref(null);
const nombre = ref("");
const apellido = ref("");
const fechaNacimiento = ref("");
const email = ref("");
const alergias = ref("");

const enviado = ref(false);
const errorMsg = ref("");

/* =========================================================
   HELPERS
   ========================================================= */
function seleccionarAlergia(valor) {
  tieneAlergia.value = valor;
}

function irALogin() {
  router.push("/login");
}

async function enviarFormulario() {
  errorMsg.value = "";

  // Validaciones
  if (tieneAlergia.value === null) {
    errorMsg.value = "Por favor indica si tienes alergias";
    return;
  }

  try {
    await volunteersStore.submitApplication({
      name: nombre.value.trim(),
      lastName: apellido.value.trim(),
      birthDate: fechaNacimiento.value,
      email: email.value.trim(),
      hasAllergies: tieneAlergia.value,
      allergiesDetail: alergias.value.trim(),
    });

    enviado.value = true;

    // Redirigir tras 2 segundos
    setTimeout(() => {
      router.push("/home");
    }, 2000);
  } catch (err) {
    errorMsg.value = err.message || "No se pudo enviar la solicitud";
  }
}

/* =========================================================
   LIFECYCLE
   ========================================================= */
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await volunteersStore.checkExisting();
  }
});
</script>

<template>
  <div class="page-wrapper">
    <div class="contenedor-base">
      <!-- ==================================================
           SIN SESIÓN → mensaje bloqueado
           ================================================== -->
      <div v-if="!authStore.isAuthenticated" class="locked-state">
        <span class="locked-icon"></span>
        <h3>Inicia sesión para aplicar</h3>
        <p class="form-subtitle">
          Necesitas una cuenta para enviar tu solicitud como voluntario.
        </p>
        <button class="botoncito locked-btn" @click="irALogin">
          Iniciar sesión
        </button>
        <router-link to="/home" class="textoUnderline">
          ← Back to Home
        </router-link>
      </div>

      <!-- ==================================================
           CON SESIÓN → formulario
           ================================================== -->
      <template v-else>
        <!-- Ya enviada -->
        <div v-if="enviado" class="success-state">
          <span class="success-icon">✅</span>
          <h3>¡Solicitud enviada!</h3>
          <p class="form-subtitle">
            Gracias por querer ser voluntario. Te contactaremos pronto.
          </p>
        </div>

        <!-- Ya aplicó antes -->
        <div v-else-if="volunteersStore.alreadyApplied" class="success-state">
          <span class="success-icon">📩</span>
          <h3>Ya enviaste tu solicitud</h3>
          <p class="form-subtitle">
            Hemos recibido tus datos. Pronto nos pondremos en contacto.
          </p>
          <router-link to="/home" class="textoUnderline">
            ← Back to Home
          </router-link>
        </div>

        <!-- Formulario -->
        <template v-else>
          <div class="form-header">
            <h3>Join as a Volunteer</h3>
            <p class="form-subtitle">
              Help us make a difference in your community
            </p>
          </div>

          <form @submit.prevent="enviarFormulario" class="formulario-log">
            <!-- Nombre y Apellido -->
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
                  <input
                    type="checkbox"
                    :checked="tieneAlergia === true"
                    hidden
                  />
                  ✓ Yes
                </label>
                <label
                  class="option-btn"
                  :class="{ selected: tieneAlergia === false }"
                  @click="seleccionarAlergia(false)"
                >
                  <input
                    type="checkbox"
                    :checked="tieneAlergia === false"
                    hidden
                  />
                  ✗ No
                </label>
              </div>

              <div v-if="tieneAlergia === true" class="extra-field">
                <input
                  v-model="alergias"
                  type="text"
                  placeholder="Describe your allergies..."
                  class="cajita-texto"
                />
              </div>
            </div>

            <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>

            <input
              type="submit"
              :value="
                volunteersStore.loading ? 'Sending...' : 'Send Application'
              "
              class="botoncito"
              :disabled="volunteersStore.loading"
            />
          </form>

          <router-link to="/home" class="textoUnderline">
            ← Back to Home
          </router-link>
        </template>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* =========================================================
   TU CSS ORIGINAL
   ========================================================= */
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

.formulario-log {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

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

.botoncito:hover:not(:disabled) {
  background-color: #267a4d;
  transform: translateY(-2px);
}

.botoncito:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

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

/* =========================================================
   NUEVOS ESTADOS
   ========================================================= */
.locked-state,
.success-state {
  text-align: center;
  padding: 1.5rem 0.5rem;
}

.locked-icon,
.success-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
}

.locked-state h3,
.success-state h3 {
  color: #2d5a27;
  font-size: 1.4rem;
  margin: 0 0 0.5rem;
}

.locked-btn {
  width: 100%;
  margin-top: 1.25rem !important;
}

.error-msg {
  margin: 5px 0 12px;
  padding: 0.55rem 0.9rem;
  background: #fdecea;
  border: 1px solid #f5c6c2;
  border-radius: 10px;
  color: #b03a2e;
  font-size: 0.85rem;
  text-align: center;
}

/* Responsive */
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
