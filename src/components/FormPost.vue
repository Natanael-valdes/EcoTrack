<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { usePostsStore } from "../stores/posts";
import { useAuthStore } from "../stores/auth";

const router = useRouter();
const postsStore = usePostsStore();
const authStore = useAuthStore();

const text = ref("");
const file = ref(null);
const fileInput = ref(null);
const submitting = ref(false);
const errorMsg = ref("");

function onFileChange(e) {
  file.value = e.target.files[0] || null;
}

function irALogin() {
  router.push("/login");
}

async function handlePost() {
  errorMsg.value = "";
  const trimmed = text.value.trim();

  if (trimmed === "" && !file.value) {
    errorMsg.value = "Escribe algo o selecciona una imagen";
    return;
  }

  submitting.value = true;

  try {
    await postsStore.addPost(trimmed, file.value);

    // Limpiar
    text.value = "";
    file.value = null;
    if (fileInput.value) fileInput.value.value = "";
  } catch (err) {
    errorMsg.value = err.message || "Error al publicar";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <!-- Si está logueado: formulario -->
  <div v-if="authStore.isAuthenticated" class="post-box">
    <input
      id="postInput"
      type="text"
      v-model="text"
      placeholder="¿Qué estás pensando?"
      :disabled="submitting"
    />

    <label class="custom-file-upload">
      <input
        ref="fileInput"
        id="imageInput"
        type="file"
        accept="image/*"
        @change="onFileChange"
      />
      Upload Image
    </label>

    <button id="postBtn" :disabled="submitting" @click="handlePost">
      {{ submitting ? "Posting..." : "Post" }}
    </button>

    <p v-if="errorMsg" class="error-msg">{{ errorMsg }}</p>
  </div>

  <!-- Si NO está logueado: mensaje -->
  <div v-else class="post-box post-box-guest">
    <p class="guest-text">Inicia sesión para publicar</p>
    <button class="login-cta" @click="irALogin">Iniciar sesión</button>
  </div>
</template>

<style scoped>
/* =========================================================
   CAJA DEL FORMULARIO
   ========================================================= */
.post-box {
  background: #ffffff;
  padding: 1.25rem;
  border-radius: 12px;
  margin: 1.5rem auto;
  max-width: 720px;
  width: calc(100% - 2rem);
  box-sizing: border-box;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.75rem;
}

/* =========================================================
   INPUT DE TEXTO
   ========================================================= */
.post-box input[type="text"] {
  flex: 1 1 100%;
  min-width: 0;
  padding: 0.85rem 1.1rem;
  border-radius: 25px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease;
  box-sizing: border-box;
}

.post-box input[type="text"]:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.12);
}

.post-box input[type="text"]:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* =========================================================
   BOTÓN "UPLOAD IMAGE" (label)
   ========================================================= */
.custom-file-upload {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.6rem 1.1rem;
  background-color: #689071;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background-color 0.2s;
  white-space: nowrap;
}

.custom-file-upload:hover {
  background-color: #375534;
}

/* Oculta el input file nativo */
.custom-file-upload input[type="file"] {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

/* =========================================================
   BOTÓN "POST"
   ========================================================= */
.post-box button {
  padding: 0.6rem 1.6rem;
  border: none;
  background-color: #6b9071;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.9rem;
  font-family: inherit;
  transition: background 0.2s;
  white-space: nowrap;
}

.post-box button:hover:not(:disabled) {
  background-color: #375534;
}

.post-box button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* =========================================================
   MENSAJE DE ERROR
   ========================================================= */
.error-msg {
  flex: 1 1 100%;
  margin: 0.5rem 0 0;
  padding: 0.55rem 0.9rem;
  background: #fdecea;
  border: 1px solid #f5c6c2;
  border-radius: 8px;
  color: #b03a2e;
  font-size: 0.85rem;
  text-align: center;
}

/* =========================================================
   MODO INVITADO (sin sesión)
   ========================================================= */
.post-box-guest {
  flex-direction: column;
  text-align: center;
  gap: 0.9rem;
  padding: 2rem 1.25rem;
}

.guest-text {
  margin: 0;
  color: #6b7280;
  font-size: 0.95rem;
}

.login-cta {
  padding: 0.65rem 1.6rem !important;
  background: #4caf50 !important;
  font-size: 0.9rem !important;
}

.login-cta:hover {
  background: #388e3c !important;
}

/* =========================================================
   RESPONSIVE — Móvil
   ========================================================= */
@media (max-width: 640px) {
  .post-box {
    padding: 1rem;
    margin: 1rem;
    width: calc(100% - 2rem);
    gap: 0.6rem;
  }

  .post-box input[type="text"] {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }

  /* En móvil, los botones ocupan el ancho completo y se apilan */
  .custom-file-upload,
  .post-box button {
    flex: 1 1 calc(50% - 0.3rem);
    padding: 0.7rem 1rem;
    font-size: 0.85rem;
  }

  .post-box-guest {
    padding: 1.5rem 1rem;
  }

  .login-cta {
    flex: 1 1 auto;
    width: 100%;
  }
}
</style>
