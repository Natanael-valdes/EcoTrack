import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

export const useVolunteersStore = defineStore("volunteers", () => {
  const loading = ref(false);
  const error = ref(null);
  const alreadyApplied = ref(false);

  /* Verificar si el usuario ya envió solicitud */
  async function checkExisting() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return false;

    const { data } = await supabase
      .from("volunteer_applications")
      .select("id")
      .eq("user_id", user.id)
      .maybeSingle();

    alreadyApplied.value = !!data;
    return alreadyApplied.value;
  }

  /* Enviar solicitud */
  async function submitApplication(form) {
    loading.value = true;
    error.value = null;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      error.value = "Debes iniciar sesión";
      loading.value = false;
      throw new Error(error.value);
    }

    const { error: insertErr } = await supabase
      .from("volunteer_applications")
      .insert({
        user_id: user.id,
        name: form.name,
        last_name: form.lastName,
        birth_date: form.birthDate,
        email: form.email,
        has_allergies: form.hasAllergies === true,
        allergies_detail:
          form.hasAllergies === true ? form.allergiesDetail : null,
      });

    loading.value = false;

    if (insertErr) {
      console.error("Error guardando solicitud:", insertErr);
      error.value = insertErr.message;
      throw insertErr;
    }

    alreadyApplied.value = true;
    return true;
  }

  return { loading, error, alreadyApplied, checkExisting, submitApplication };
});
