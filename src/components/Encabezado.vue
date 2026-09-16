<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/auth";
import { useProfilesStore } from "../stores/profiles";

const router = useRouter();
const authStore = useAuthStore();
const profilesStore = useProfilesStore();

/* =========================================================
   MENÚ PRINCIPAL
   ========================================================= */
const menuItems = [
  { nombre: "Home", ruta: "/home" },
  { nombre: "EcoNews", ruta: "/EcoNews" },
  { nombre: "EcoCraft", ruta: "/ecocraft" },
  { nombre: "EcoMap", ruta: "/map" },
  { nombre: "About Us", ruta: "/about" },
];

const menuAbierto = ref(false);

function toggleMenu() {
  menuAbierto.value = !menuAbierto.value;
}

function cerrarMenu() {
  menuAbierto.value = false;
}

/* =========================================================
   MENÚ DE USUARIO
   ========================================================= */
const userMenuAbierto = ref(false);
const userMenuRef = ref(null);

const initials = computed(() => {
  const email = authStore.user?.email || "";
  return email.substring(0, 2).toUpperCase();
});

const avatarUrl = computed(() => profilesStore.profile?.avatar_url || null);
const username = computed(() => profilesStore.profile?.username || null);

const displayName = computed(() => {
  return username.value ? `@${username.value}` : authStore.user?.email;
});

function toggleUserMenu() {
  userMenuAbierto.value = !userMenuAbierto.value;
}

function cerrarUserMenu() {
  userMenuAbierto.value = false;
}

function irAPerfil() {
  cerrarUserMenu();
  cerrarMenu();
  router.push("/profile");
}

async function cerrarSesion() {
  cerrarUserMenu();
  cerrarMenu();
  await authStore.signOut();
  router.push("/home");
}

/* =========================================================
   CERRAR DROPDOWN AL CLICK FUERA
   ========================================================= */
function handleClickOutside(e) {
  if (
    userMenuAbierto.value &&
    userMenuRef.value &&
    !userMenuRef.value.contains(e.target)
  ) {
    userMenuAbierto.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside, {
    passive: true,
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
  document.removeEventListener("touchstart", handleClickOutside);
});
</script>

<template>
  <nav class="navbar">
    <div class="logo">EcoTrack</div>

    <button class="hamburger" @click="toggleMenu" aria-label="Menú">☰</button>

    <ul class="nav-links" :class="{ open: menuAbierto }">
      <!-- Links normales -->
      <li v-for="item in menuItems" :key="item.ruta">
        <router-link :to="item.ruta" @click="cerrarMenu">
          {{ item.nombre }}
        </router-link>
      </li>

      <!-- ===== Sin sesión → Profile va al login ===== -->
      <li v-if="!authStore.isAuthenticated">
        <router-link to="/" @click="cerrarMenu">Profile</router-link>
      </li>

      <!-- ===== Con sesión → avatar + dropdown ===== -->
      <li v-else ref="userMenuRef" class="user-item">
        <button
          type="button"
          class="user-btn"
          :aria-expanded="userMenuAbierto"
          @click.stop="toggleUserMenu"
        >
          <img
            v-if="avatarUrl"
            :src="avatarUrl"
            alt="Avatar"
            class="user-avatar-img"
          />
          <span v-else class="user-avatar-initials">{{ initials }}</span>

          <span class="user-name">{{ displayName }}</span>
          <span class="chevron" :class="{ open: userMenuAbierto }">▾</span>
        </button>

        <!-- Dropdown -->
        <div v-if="userMenuAbierto" class="dropdown">
          <button type="button" class="dropdown-item" @click="irAPerfil">
            Mi perfil
          </button>
          <button
            type="button"
            class="dropdown-item danger"
            @click="cerrarSesion"
          >
            Cerrar sesión
          </button>
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
/* =========================================================
   NAVBAR
   ========================================================= */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #2f4f2f;
  padding: 20px 40px;
  position: relative;
  z-index: 100;
}

.logo {
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 30px;
  align-items: center;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;
}

.nav-links a:hover {
  opacity: 0.75;
}

.hamburger {
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.8rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  line-height: 1;
}

/* =========================================================
   USER MENU
   ========================================================= */
.user-item {
  position: relative;
}

.user-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.3rem 0.7rem 0.3rem 0.3rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 999px;
  color: #ffffff;
  cursor: pointer;
  font-family: inherit;
  font-size: 0.85rem;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.2s ease;
}

.user-btn:hover {
  background: rgba(255, 255, 255, 0.22);
}

.user-avatar-img,
.user-avatar-initials {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  background: linear-gradient(135deg, #4caf50, #2e7d32);
  color: #ffffff;
  flex-shrink: 0;
}

.user-name {
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: 600;
}

.chevron {
  font-size: 0.7rem;
  transition: transform 0.2s ease;
  opacity: 0.8;
}

.chevron.open {
  transform: rotate(180deg);
}

/* =========================================================
   DROPDOWN
   ========================================================= */
.dropdown {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  min-width: 200px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow:
    0 12px 32px rgba(0, 0, 0, 0.18),
    0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  padding: 0.35rem;
  z-index: 500;
}

.dropdown-item {
  display: block;
  width: 100%;
  padding: 0.75rem 0.9rem;
  background: transparent;
  border: none;
  text-align: left;
  font-family: inherit;
  font-size: 0.9rem;
  color: #1e3d1a;
  border-radius: 8px;
  cursor: pointer;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  transition: background 0.15s ease;
}

.dropdown-item:hover,
.dropdown-item:active {
  background: #eef7ed;
}

.dropdown-item.danger {
  color: #c62828;
}

.dropdown-item.danger:hover,
.dropdown-item.danger:active {
  background: #fdecea;
}

/* =========================================================
   RESPONSIVE — Móvil
   ========================================================= */
@media (max-width: 768px) {
  .navbar {
    padding: 15px 20px;
  }

  .hamburger {
    display: block;
  }

  .nav-links {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #2f4f2f;
    padding: 20px;
    gap: 1rem;
    align-items: stretch;
    z-index: 400;
    max-height: calc(100vh - 70px);
    overflow-y: auto;
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links li {
    width: 100%;
  }

  .nav-links a {
    display: block;
    padding: 0.5rem 0;
  }

  .user-item {
    position: static;
    width: 100%;
  }

  .user-btn {
    width: 100%;
    justify-content: flex-start;
    padding: 0.6rem 1rem;
    font-size: 0.9rem;
  }

  .user-name {
    display: inline;
    max-width: none;
    flex: 1;
    text-align: left;
  }

  .dropdown {
    position: static;
    margin-top: 0.5rem;
    margin-left: 2.5rem;
    width: calc(100% - 2.5rem);
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.18);
    background: rgba(0, 0, 0, 0.15);
  }

  .dropdown-item {
    color: #ffffff;
    padding: 0.75rem 0.9rem;
  }

  .dropdown-item:hover,
  .dropdown-item:active {
    background: rgba(255, 255, 255, 0.1);
  }

  .dropdown-item.danger {
    color: #ffb3b3;
  }

  .dropdown-item.danger:hover,
  .dropdown-item.danger:active {
    background: rgba(198, 40, 40, 0.2);
  }
}
</style>
