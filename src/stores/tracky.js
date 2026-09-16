import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

export const useTrackyStore = defineStore("tracky", () => {
  const points = ref(0);
  const history = ref([]);
  const loading = ref(false);
  const error = ref(null);

  /* =========================================================
     CARGAR DATOS DEL USUARIO ACTUAL
     ========================================================= */
  async function loadTracky() {
    loading.value = true;
    error.value = null;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      points.value = 0;
      history.value = [];
      loading.value = false;
      return;
    }

    // 1. Puntos (crea el registro si no existe)
    let { data: stats, error: statsErr } = await supabase
      .from("user_stats")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    if (statsErr) {
      console.error("Error cargando stats:", statsErr);
      error.value = statsErr.message;
    } else if (!stats) {
      const { data: created, error: createErr } = await supabase
        .from("user_stats")
        .insert({ user_id: user.id, points: 0 })
        .select()
        .single();

      if (createErr) {
        console.error("Error creando stats:", createErr);
        error.value = createErr.message;
      } else {
        stats = created;
      }
    }

    points.value = stats?.points ?? 0;

    // 2. Historial (últimas 20 acciones)
    const { data: actions, error: actErr } = await supabase
      .from("eco_actions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (actErr) {
      console.error("Error cargando historial:", actErr);
      error.value = actErr.message;
    } else {
      history.value = actions || [];
    }

    loading.value = false;
  }

  /* =========================================================
     REGISTRAR UNA ACCIÓN
     ========================================================= */
  async function logAction(label, pts) {
    error.value = null;

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      error.value = "Debes iniciar sesión";
      throw new Error(error.value);
    }

    // 1. Insertar la acción en el historial
    const { data: newAction, error: insertErr } = await supabase
      .from("eco_actions")
      .insert({
        user_id: user.id,
        label,
        points: pts,
      })
      .select()
      .single();

    if (insertErr) {
      console.error("Error insertando acción:", insertErr);
      error.value = insertErr.message;
      throw insertErr;
    }

    // 2. Sumar puntos al total
    const newTotal = points.value + pts;
    const { error: updateErr } = await supabase
      .from("user_stats")
      .update({ points: newTotal, updated_at: new Date().toISOString() })
      .eq("user_id", user.id);

    if (updateErr) {
      console.error("Error actualizando puntos:", updateErr);
      error.value = updateErr.message;
      throw updateErr;
    }

    // 3. Actualizar estado local
    points.value = newTotal;
    history.value.unshift(newAction);
  }

  /* =========================================================
   NIVEL ACTUAL (según puntos)
   ========================================================= */
  const levelInfo = computed(() => {
    if (points.value >= 300) return { title: "Earth Guardian", badge: "🌍" };
    if (points.value >= 150) return { title: "Urban Forest", badge: "🌳" };
    if (points.value >= 50) return { title: "Eco Friend", badge: "🌿" };
    return { title: "Beginner", badge: "🌱" };
  });

  return {
    points,
    history,
    loading,
    error,
    levelInfo,
    loadTracky,
    logAction,
  };
});
