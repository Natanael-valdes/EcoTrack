<script setup>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { usePostsStore } from "../stores/posts";
import { useProfilesStore } from "../stores/profiles";

const router = useRouter();
const authStore = useAuthStore();
const postsStore = usePostsStore();
const profilesStore = useProfilesStore();

/* =========================================================
   ESTADO — AVATAR
   ========================================================= */
const fileInput = ref(null);
const uploading = ref(false);
const uploadError = ref("");

/* =========================================================
   ESTADO — USERNAME
   ========================================================= */
const editingUsername = ref(false);
const usernameInput = ref("");
const savingUsername = ref(false);
const usernameError = ref("");

/* =========================================================
   COMPUTED
   ========================================================= */
const initials = computed(() => {
  const email = authStore.user?.email || "";
  return email.substring(0, 2).toUpperCase();
});

const avatarUrl = computed(() => profilesStore.profile?.avatar_url || null);
const username = computed(() => profilesStore.profile?.username || null);

const displayName = computed(() => {
  return username.value ? `@${username.value}` : authStore.user?.email;
});

const memberSince = computed(() => {
  const date = authStore.user?.created_at;
  if (!date) return "";
  return new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});

const myPostsCount = computed(() => {
  if (!authStore.user) return 0;
  return postsStore.posts.filter((p) => p.user_id === authStore.user.id).length;
});

/* =========================================================
   AVATAR
   ========================================================= */
function triggerFileInput() {
  fileInput.value?.click();
}

async function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    uploadError.value = "Solo se permiten imágenes";
    return;
  }
  if (file.size > 3 * 1024 * 1024) {
    uploadError.value = "La imagen no debe superar 3 MB";
    return;
  }

  uploadError.value = "";
  uploading.value = true;

  try {
    await profilesStore.uploadAvatar(file);
  } catch (err) {
    uploadError.value = err.message || "Error al subir la imagen";
  } finally {
    uploading.value = false;
    if (fileInput.value) fileInput.value.value = "";
  }
}

/* =========================================================
   USERNAME
   ========================================================= */
function startEditUsername() {
  usernameInput.value = username.value || "";
  editingUsername.value = true;
  usernameError.value = "";
}

function cancelEditUsername() {
  editingUsername.value = false;
  usernameError.value = "";
}

async function saveUsername() {
  usernameError.value = "";
  savingUsername.value = true;

  try {
    await profilesStore.updateUsername(usernameInput.value);
    editingUsername.value = false;
  } catch (err) {
    usernameError.value = err.message || "Error al guardar";
  } finally {
    savingUsername.value = false;
  }
}

/* =========================================================
   LOGOUT
   ========================================================= */
async function handleLogout() {
  await authStore.signOut();
  router.push("/");
}

/* =========================================================
   LIFECYCLE
   ========================================================= */
onMounted(async () => {
  if (authStore.isAuthenticated) {
    await profilesStore.loadProfile();
  }
  if (postsStore.posts.length === 0) {
    postsStore.loadPosts();
  }
});
</script>

<template>
  <div v-if="authStore.isAuthenticated" class="profile-card">
    <!-- ================= HEADER ================= -->
    <div class="profile-header">
      <!-- Avatar clickeable -->
      <div class="avatar-wrapper" @click="triggerFileInput">
        <img
          v-if="avatarUrl"
          :src="avatarUrl"
          alt="Avatar"
          class="avatar-img"
        />
        <div v-else class="avatar">{{ initials }}</div>

        <div class="avatar-overlay">
          {{ uploading ? "..." : "Cambiar" }}
        </div>

        <input
          ref="fileInput"
          type="file"
          accept="image/*"
          hidden
          @change="onFileChange"
        />
      </div>

      <!-- Info del usuario -->
      <div class="info">
        <!-- Modo edición de username -->
        <div v-if="editingUsername" class="username-editor">
          <span class="at">@</span>
          <input
            v-model="usernameInput"
            type="text"
            maxlength="20"
            placeholder="tunombre"
            class="username-input"
            autofocus
            @keyup.enter="saveUsername"
            @keyup.esc="cancelEditUsername"
          />
          <button
            class="mini-btn save"
            :disabled="savingUsername"
            @click="saveUsername"
            title="Guardar"
          >
            {{ savingUsername ? "..." : "✓" }}
          </button>
          <button
            class="mini-btn cancel"
            :disabled="savingUsername"
            @click="cancelEditUsername"
            title="Cancelar"
          >
            ✕
          </button>
        </div>

        <!-- Modo lectura -->
        <div v-else class="username-display">
          <h1>{{ displayName }}</h1>
          <button
            class="edit-username-btn"
            :title="username ? 'Editar username' : 'Elegir username'"
            @click="startEditUsername"
          >
            ✏️
          </button>
        </div>

        <p v-if="username" class="email-small">{{ authStore.user.email }}</p>
        <p class="since">Miembro desde {{ memberSince }}</p>

        <p v-if="usernameError" class="username-error">{{ usernameError }}</p>
      </div>
    </div>

    <p v-if="uploadError" class="upload-error">{{ uploadError }}</p>

    <!-- ================= STATS ================= -->
    <div class="stats">
      <div class="stat">
        <span class="number">{{ myPostsCount }}</span>
        <span class="label">Posts</span>
      </div>
      <div class="stat">
        <span class="number">0</span>
        <span class="label">Likes</span>
      </div>
      <div class="stat">
        <span class="number">0</span>
        <span class="label">Saved</span>
      </div>
    </div>

    <!-- ================= LOGOUT ================= -->
    <button class="logout-btn" @click="handleLogout">Cerrar sesión</button>
  </div>

  <div v-else class="profile-empty">
    <p>Redirigiendo al login...</p>
  </div>
</template>

<style scoped>
/* =========================================================
   CARD
   ========================================================= */
.profile-card {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem 2.25rem;
  width: 100%;
  max-width: 480px;
  box-shadow:
    0 4px 24px rgba(20, 40, 25, 0.08),
    0 16px 48px rgba(20, 40, 25, 0.06);
  border: 1px solid #e8eee9;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* =========================================================
   HEADER
   ========================================================= */
.profile-header {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-bottom: 2rem;
}

/* ===== AVATAR ===== */
.avatar-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  cursor: pointer;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(46, 125, 50, 0.3);
  transition: transform 0.2s ease;
}

.avatar-wrapper:hover {
  transform: scale(1.03);
}

.avatar {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: 0.05em;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  opacity: 0;
  transition: opacity 0.2s ease;
  pointer-events: none;
}

.avatar-wrapper:hover .avatar-overlay {
  opacity: 1;
}

/* ===== INFO ===== */
.info {
  flex: 1;
  min-width: 0;
}

/* ===== USERNAME — DISPLAY ===== */
.username-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.username-display h1 {
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: #1e3d1a;
  word-break: break-all;
}

.edit-username-btn {
  background: transparent;
  border: none;
  font-size: 0.9rem;
  cursor: pointer;
  padding: 0.2rem 0.4rem;
  border-radius: 6px;
  transition: background 0.2s ease;
  opacity: 0.6;
  flex-shrink: 0;
}

.edit-username-btn:hover {
  background: #eef7ed;
  opacity: 1;
}

/* ===== USERNAME — EDITOR ===== */
.username-editor {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.at {
  font-size: 1.15rem;
  font-weight: 700;
  color: #2d5a27;
}

.username-input {
  flex: 1;
  min-width: 0;
  padding: 0.4rem 0.6rem;
  border: 1px solid #dfe9e0;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  color: #1e3d1a;
  outline: none;
  font-family: inherit;
}

.username-input:focus {
  border-color: #4caf50;
  box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.15);
}

.mini-btn {
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 700;
  transition: background 0.2s ease;
  flex-shrink: 0;
}

.mini-btn.save {
  background: #4caf50;
  color: #ffffff;
}

.mini-btn.save:hover:not(:disabled) {
  background: #388e3c;
}

.mini-btn.cancel {
  background: #f0f0f0;
  color: #666;
}

.mini-btn.cancel:hover:not(:disabled) {
  background: #e0e0e0;
}

.mini-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ===== TEXTOS INFO ===== */
.email-small {
  margin: 0 0 0.35rem;
  font-size: 0.78rem;
  color: #9ca3af;
  word-break: break-all;
}

.since {
  margin: 0;
  font-size: 0.85rem;
  color: #6b7280;
}

/* ===== MENSAJES ===== */
.username-error {
  margin: 0.5rem 0 0;
  padding: 0.5rem 0.75rem;
  background: #fdecea;
  border: 1px solid #f5c6c2;
  border-radius: 8px;
  color: #b03a2e;
  font-size: 0.8rem;
}

.upload-error {
  margin: -1rem 0 1rem;
  padding: 0.65rem 0.9rem;
  background: #fdecea;
  border: 1px solid #f5c6c2;
  border-radius: 8px;
  color: #b03a2e;
  font-size: 0.85rem;
  text-align: center;
}

/* =========================================================
   STATS
   ========================================================= */
.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
  padding: 1.25rem 0;
  margin-bottom: 1.75rem;
  border-top: 1px solid #eef1ee;
  border-bottom: 1px solid #eef1ee;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.number {
  font-size: 1.5rem;
  font-weight: 800;
  color: #2d5a27;
}

.label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  font-weight: 600;
}

/* =========================================================
   LOGOUT
   ========================================================= */
.logout-btn {
  width: 100%;
  padding: 0.85rem;
  background: transparent;
  color: #c62828;
  border: 1.5px solid #c62828;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    background 0.2s ease,
    color 0.2s ease,
    transform 0.2s ease;
}

.logout-btn:hover {
  background: #c62828;
  color: #ffffff;
  transform: translateY(-2px);
}

/* =========================================================
   ESTADO SIN LOGIN
   ========================================================= */
.profile-empty {
  color: #6b7280;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */
@media (max-width: 480px) {
  .profile-card {
    padding: 2rem 1.5rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
  }

  .avatar-wrapper {
    width: 72px;
    height: 72px;
  }

  .avatar {
    font-size: 1.4rem;
  }

  .username-display,
  .username-editor {
    justify-content: center;
  }

  .info {
    width: 100%;
  }
}
</style>
