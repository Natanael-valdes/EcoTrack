<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

// Estado del formulario
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const localError = ref("");
const successMessage = ref("");
const submitting = ref(false);

// Navegación
function irALogin() {
  router.push("/");
}

// Registro con Supabase
async function handleSignUp() {
  localError.value = "";
  successMessage.value = "";

  if (!email.value || !password.value || !confirmPassword.value) {
    localError.value = "Todos los campos son obligatorios";
    return;
  }

  if (password.value.length < 6) {
    localError.value = "La contraseña debe tener al menos 6 caracteres";
    return;
  }

  if (password.value !== confirmPassword.value) {
    localError.value = "Las contraseñas no coinciden";
    return;
  }

  submitting.value = true;

  try {
    await authStore.signUp(email.value, password.value);
    successMessage.value = "¡Cuenta creada! Redirigiendo al login...";

    setTimeout(() => {
      router.push("/");
    }, 1500);
  } catch (err) {
    localError.value = err.message || "No se pudo crear la cuenta";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <div>
    <div class="contenedor-Login">
      <!-- Logo, collage, slogan -->
      <section class="izquierda-Login">
        <img src="../assets/IMG/logooo.png" alt="Eco Logo" class="logo" />

        <h2>
          Let´s <br />help<br />
          the planet<br />
          together,<br />one <span>Track</span> <br />at a time
        </h2>

        <img
          src="../assets/IMG/_TRACK__4_-removebg-preview (1).png"
          alt="Collage"
          class="collage"
        />
      </section>

      <!-- Formulario -->
      <section class="derecha">
        <div class="login">
          <h2>Create your <span>EcoTrack</span> account</h2>

          <form @submit.prevent="handleSignUp" class="formulario-log">
            <input
              v-model="email"
              type="email"
              placeholder="Email"
              class="caja-texto"
              autocomplete="email"
            />
            <input
              v-model="password"
              type="password"
              placeholder="Password (min. 6 characters)"
              class="caja-texto"
              autocomplete="new-password"
            />
            <input
              v-model="confirmPassword"
              type="password"
              placeholder="Confirm password"
              class="caja-texto"
              autocomplete="new-password"
            />

            <p v-if="localError" class="error-msg">{{ localError }}</p>
            <p v-if="successMessage" class="success-msg">
              {{ successMessage }}
            </p>

            <input
              type="submit"
              :value="submitting ? 'Creating account...' : 'Create account'"
              class="botoncito"
              :disabled="submitting"
            />
          </form>

          <p class="already">
            Already have an account?
            <a href="" @click.prevent="irALogin">Log in</a>
          </p>

          <p class="Eco">®EcoTrack</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* ===== MISMO ESTILO QUE LogIn.vue ===== */
.contenedor-Login {
  display: flex;
  min-height: 100vh;
}

.izquierda-Login {
  width: 50%;
  padding: 50px;
  position: relative;
}

.logo {
  width: 100px;
  height: 100px;
  margin-bottom: 150px;
}

.izquierda-Login h2 {
  font-size: 40px;
  font-weight: 700;
  line-height: 1.05;
  color: #111;
}

.collage {
  position: absolute;
  width: 350px;
  right: 70px;
  top: 90px;
}

.derecha {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #ddd;
}

.login {
  width: 75%;
}

.login h2 {
  margin-bottom: 25px;
  font-size: 22px;
  font-weight: 500;
}

.formulario-log {
  display: flex;
  flex-direction: column;
}

.caja-texto {
  height: 30px;
  border: 1px solid #ccc;
  border-radius: 18px;
  margin-bottom: 10px;
  padding: 5%;
  font-size: 15px;
}

input:focus {
  outline: none;
  border: 2px solid #037027;
}

.botoncito {
  height: 45px;
  background-color: #2d935e;
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: 0.3s;
  padding: 2%;
}

.botoncito:hover:not(:disabled) {
  background-color: #267a4d;
}

.botoncito:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.already {
  text-align: center;
  color: #111;
  font-size: 15px;
  margin: 10px 0 30px;
}

.already a {
  color: #2d935e;
  font-weight: 600;
  text-decoration: none;
}

.already a:hover {
  text-decoration: underline;
}

.Eco {
  text-align: center;
  margin-top: 25px;
  color: #666;
  font-size: 18px;
}

.error-msg {
  margin: 0 0 12px;
  padding: 0.65rem 0.9rem;
  background: #fdecea;
  border: 1px solid #f5c6c2;
  border-radius: 10px;
  color: #b03a2e;
  font-size: 0.85rem;
  text-align: center;
}

.success-msg {
  margin: 0 0 12px;
  padding: 0.65rem 0.9rem;
  background: #eef7ed;
  border: 1px solid #c8e6c9;
  border-radius: 10px;
  color: #2d5a27;
  font-size: 0.85rem;
  text-align: center;
}

@media (max-width: 900px) {
  /* Contenedor principal en columna */
  .contenedor-Login {
    flex-direction: column;
    min-height: 100vh;
  }

  /* Panel izquierdo: solo el logo, centrado */
  .izquierda-Login {
    width: 100%;
    min-height: auto;
    padding: 2.5rem 1.5rem 1.5rem;

    display: flex;
    justify-content: center;
    align-items: center;
    position: static; /* quita el posicionamiento relativo */
  }

  /* Logo centrado, tamaño cómodo */
  .logo {
    width: 110px;
    height: 110px;
    margin: 0;
  }

  /* Ocultar collage y h2 en móvil */
  .collage {
    display: none;
  }

  .izquierda-Login h2 {
    display: none;
  }

  /* Panel derecho (formulario) va abajo, ancho completo */
  .derecha {
    width: 100%;
    border-left: none;
    border-top: 1px solid #ddd;
    padding: 2rem 1.5rem 3rem;
    min-height: auto;
  }

  .login {
    width: 100%;
    max-width: 420px;
  }
}
</style>
