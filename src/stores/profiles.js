import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

export const useProfilesStore = defineStore("profiles", () => {
  const profile = ref(null);
  const loading = ref(false);
  const error = ref(null);

  /* =========================================================
     CARGAR EL PERFIL DEL USUARIO ACTUAL
     ========================================================= */
  async function loadProfile() {
    loading.value = true;
    error.value = null;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      profile.value = null;
      loading.value = false;
      return;
    }

    const { data, error: err } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    if (err) {
      console.error("Error cargando perfil:", err);
      error.value = err.message;
    } else if (!data) {
      // No existe aún → crear uno vacío
      const { data: created, error: createErr } = await supabase
        .from("profiles")
        .insert({ id: user.id })
        .select()
        .single();

      if (createErr) {
        console.error("Error creando perfil:", createErr);
        error.value = createErr.message;
      } else {
        profile.value = created;
      }
    } else {
      profile.value = data;
    }

    loading.value = false;
  }

  /* =========================================================
     SUBIR AVATAR
     ========================================================= */
  async function uploadAvatar(file) {
    error.value = null;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      error.value = "No hay usuario autenticado";
      throw new Error(error.value);
    }

    // 1. Subir la imagen al bucket
    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/avatar-${Date.now()}.${fileExt}`;

    const { error: uploadErr } = await supabase.storage
      .from("avatars")
      .upload(fileName, file, { upsert: true });

    if (uploadErr) {
      console.error("Error subiendo avatar:", uploadErr);
      error.value = "Error al subir la imagen";
      throw uploadErr;
    }

    // 2. Obtener la URL pública
    const { data: publicUrl } = supabase.storage
      .from("avatars")
      .getPublicUrl(fileName);

    const avatarUrl = publicUrl.publicUrl;

    // 3. Guardar la URL en la tabla profiles
    const { data: updated, error: updateErr } = await supabase
      .from("profiles")
      .update({ avatar_url: avatarUrl, updated_at: new Date().toISOString() })
      .eq("id", user.id)
      .select()
      .single();

    if (updateErr) {
      console.error("Error actualizando perfil:", updateErr);
      error.value = updateErr.message;
      throw updateErr;
    }

    profile.value = updated;
    return avatarUrl;
  }

  /* =========================================================
   ACTUALIZAR USERNAME
   ========================================================= */
  async function updateUsername(newUsername) {
    error.value = null;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      error.value = "No hay usuario autenticado";
      throw new Error(error.value);
    }

    // Normalizar: minúsculas y quitar espacios
    const clean = newUsername.trim().toLowerCase();

    // Validar antes de enviar
    if (!/^[a-z0-9_]{3,20}$/.test(clean)) {
      error.value = "Solo minúsculas, números y _ (3 a 20 caracteres)";
      throw new Error(error.value);
    }

    // Verificar que no esté en uso por OTRO usuario
    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("username", clean)
      .maybeSingle();

    if (existing && existing.id !== user.id) {
      error.value = "Ese username ya está en uso";
      throw new Error(error.value);
    }

    // Guardar
    const { data: updated, error: updateErr } = await supabase
      .from("profiles")
      .update({ username: clean, updated_at: new Date().toISOString() })
      .eq("id", user.id)
      .select()
      .single();

    if (updateErr) {
      console.error("Error actualizando username:", updateErr);
      error.value = updateErr.message;
      throw updateErr;
    }

    profile.value = updated;
    return updated;
  }

  return { profile, loading, error, loadProfile, uploadAvatar, updateUsername };
});
