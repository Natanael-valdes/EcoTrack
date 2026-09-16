// src/stores/auth.js
import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const loading = ref(true);
  const error = ref(null);

  const isAuthenticated = computed(() => !!user.value);

  /* =========================================================
     INICIALIZAR — Revisa si hay sesión activa
     ========================================================= */
  async function initialize() {
    loading.value = true;

    const {
      data: { session },
    } = await supabase.auth.getSession();
    user.value = session?.user ?? null;

    // Escuchar cambios (login, logout, refresh token)
    supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user ?? null;
    });

    loading.value = false;
  }

  /* =========================================================
     REGISTRARSE
     ========================================================= */
  async function signUp(email, password) {
    error.value = null;
    loading.value = true;

    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
    });

    loading.value = false;

    if (err) {
      error.value = err.message;
      throw err;
    }

    return data;
  }

  /* =========================================================
     INICIAR SESIÓN
     ========================================================= */
  async function signIn(email, password) {
    error.value = null;
    loading.value = true;

    const { data, error: err } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    loading.value = false;

    if (err) {
      error.value = err.message;
      throw err;
    }

    return data;
  }

  /* =========================================================
     CERRAR SESIÓN
     ========================================================= */
  async function signOut() {
    error.value = null;
    await supabase.auth.signOut();
    user.value = null;
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    initialize,
    signUp,
    signIn,
    signOut,
  };
});
