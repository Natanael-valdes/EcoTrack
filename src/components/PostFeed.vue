<script setup>
import { computed } from "vue";
import { posts, removePost } from "../stores/posts";

const props = defineProps({
  limit: {
    type: Number,
    default: 0,
  },
});

const displayedPosts = computed(() => {
  if (!props.limit || props.limit <= 0) return posts;
  return posts.slice(0, props.limit);
});
</script>

<template>
  <div id="postsContainer">
    <div v-for="post in displayedPosts" :key="post.id" class="post">
      <h4>{{ post.user }}</h4>

      <p v-if="post.text">{{ post.text }}</p>

      <img v-if="post.image" :src="post.image" alt="" />

      <button v-if="post.own" class="delete-btn" @click="removePost(post.id)">
        Eliminar
      </button>
    </div>
  </div>
</template>

<style scoped>
/* ...tu CSS tal cual, no lo toques... */
</style>

<style scoped>
#postsContainer {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem;
  width: 100%;
  max-width: 1200px;
  margin: 1.5rem auto;
  padding: 0 1rem;
  box-sizing: border-box;
  justify-content: center;
}

.post {
  flex: 0 0 calc((100% - 2.5rem) / 3);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-height: 220px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.post:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 14px rgba(0, 0, 0, 0.1);
}

.post h4 {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2e7d32;
}

.post p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.45;
  color: #333;
  flex: 1;
}

/* =========================================
   Imagen
   ========================================= */
.post img {
  width: 100%;
  height: 160px;
  object-fit: cover; /* recorta sin deformar */
  border-radius: 8px;
}

/* =========================================
   Botón eliminar
   ========================================= */
.delete-btn {
  align-self: flex-end;
  margin-top: auto; /* lo pega al fondo de la caja */
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  background: transparent;
  color: #c62828;
  border: 1px solid #c62828;
  border-radius: 6px;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease;
}

.delete-btn:hover {
  background: #c62828;
  color: #ffffff;
}

/* =========================================
   Responsive → 2 por fila en tablet
   ========================================= */
@media (max-width: 900px) {
  .post {
    flex: 0 0 calc((100% - 1.25rem) / 2); /* 2 por fila */
  }
}

/* =========================================
   Responsive → 1 por fila en móvil
   ========================================= */
@media (max-width: 600px) {
  .post {
    flex: 0 0 100%; /* 1 por fila */
  }
}
</style>
