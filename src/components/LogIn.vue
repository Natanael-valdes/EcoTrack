<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const authStore = useAuthStore();

// Estado del formulario
const email = ref("");
const password = ref("");
const localError = ref("");
const submitting = ref(false);

// Navegación
function botonMover() {
  router.push("/create-account");
}

function btonPassword() {
  router.push("/restore-password");
}

// Login real con Supabase
async function handleLogin() {
  localError.value = "";

  if (!email.value || !password.value) {
    localError.value = "Email y contraseña son obligatorios";
    return;
  }

  submitting.value = true;

  try {
    await authStore.signIn(email.value, password.value);
    router.push("/home");
  } catch (err) {
    localError.value = err.message || "Credenciales incorrectas";
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
          <h2>Log in to <span>EcoTrack</span></h2>

          <form @submit.prevent="handleLogin" class="formulario-log">
            <input
              v-model="email"
              type="text"
              placeholder="Email or Phone number"
              class="caja-texto"
              autocomplete="email"
            />
            <input
              v-model="password"
              type="password"
              placeholder="password"
              class="caja-texto"
              autocomplete="current-password"
            />

            <p v-if="localError" class="error-msg">{{ localError }}</p>

            <input
              type="submit"
              :value="submitting ? 'Logging in...' : 'Log in'"
              class="botoncito"
              :disabled="submitting"
            />
          </form>

          <a href="#" @click.prevent="btonPassword">Forgotten password?</a>

          <button class="crear" @click="botonMover">Create new account</button>

          <p class="Eco">®EcoTrack</p>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
span {
  color: #2e8b57;
}

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

.login a {
  justify-content: center;
  text-align: center;
  display: block;
  color: #111;
  text-decoration: none;
  margin-bottom: 40px;
}

.login a:hover {
  text-decoration: underline;
}

.crear {
  width: 100%;
  height: 35px;
  background-color: white;
  color: black;
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: 0.3s;
  border: gray;
}

.crear:hover {
  background-color: #e0e0e0;
}

.Eco {
  text-align: center;
  margin-top: 25px;
  color: #666;
  font-size: 18px;
}

/* ===== ÚNICO NUEVO: estilos del mensaje de error ===== */
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

@media (max-width: 900px) {
  .contenedor-Login {
    flex-direction: column;
    min-height: auto;
  }

  .izquierda-Login {
    width: 100%;
    padding: 30px;
  }

  .logo {
    margin-bottom: 20px;
  }

  .izquierda-Login h2 {
    font-size: 28px;
  }

  .collage {
    position: static;
    width: 100%;
    max-width: 300px;
    margin-top: 20px;
    right: auto;
    top: auto;
  }

  .derecha {
    width: 100%;
    border-left: none;
    border-top: 1px solid #ddd;
    padding: 30px 0;
  }

  .login {
    width: 90%;
  }
}
</style>
