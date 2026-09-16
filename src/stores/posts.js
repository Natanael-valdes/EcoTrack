// src/stores/posts.js
import { ref } from "vue";
import { defineStore } from "pinia";
import { supabase } from "../lib/supabase";

export const usePostsStore = defineStore("posts", () => {
  const posts = ref([]);
  const loading = ref(false);
  const error = ref(null);

  /* =========================================================
     CARGAR TODOS LOS POSTS
     ========================================================= */
  async function loadPosts() {
    loading.value = true;
    error.value = null;

    const { data, error: err } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (err) {
      console.error("Error cargando posts:", err);
      error.value = err.message;
    } else {
      posts.value = data;
    }

    loading.value = false;
  }

  /* =========================================================
   CREAR POST (con imagen opcional)
   ========================================================= */
  async function addPost(text, file) {
    error.value = null;

    // 1. Usuario actual
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      error.value = "Debes iniciar sesión para publicar";
      throw new Error(error.value);
    }

    // 2. Traer el username del perfil (si existe)
    const { data: profile } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .maybeSingle();

    const displayUsername = profile?.username
      ? `@${profile.username}`
      : user.email?.split("@")[0] || "Usuario";

    // 3. Subir imagen si hay
    let imageUrl = null;
    if (file) {
      const fileName = `${user.id}/${Date.now()}-${file.name}`;

      const { error: uploadErr } = await supabase.storage
        .from("post-images")
        .upload(fileName, file);

      if (uploadErr) {
        console.error("Error subiendo imagen:", uploadErr);
        error.value = "Error al subir la imagen";
        throw uploadErr;
      }

      const { data: publicUrl } = supabase.storage
        .from("post-images")
        .getPublicUrl(fileName);

      imageUrl = publicUrl.publicUrl;
    }

    // 4. Insertar el post
    const { data: newPost, error: insertErr } = await supabase
      .from("posts")
      .insert({
        user_id: user.id,
        username: displayUsername,
        text: text || null,
        image_url: imageUrl,
      })
      .select()
      .single();

    if (insertErr) {
      console.error("Error insertando post:", insertErr);
      error.value = insertErr.message;
      throw insertErr;
    }

    posts.value.unshift(newPost);
    return newPost;
  }

  /* =========================================================
     ELIMINAR POST
     ========================================================= */
  async function removePost(id) {
    error.value = null;

    const { error: deleteErr } = await supabase
      .from("posts")
      .delete()
      .eq("id", id);

    if (deleteErr) {
      console.error("Error eliminando:", deleteErr);
      error.value = deleteErr.message;
      throw deleteErr;
    }

    posts.value = posts.value.filter((p) => p.id !== id);
  }

  return { posts, loading, error, loadPosts, addPost, removePost };
});
