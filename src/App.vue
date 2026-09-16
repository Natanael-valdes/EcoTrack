<script setup>
import { onMounted } from "vue";
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { useProfilesStore } from "./stores/profiles";

const authStore = useAuthStore();
const profilesStore = useProfilesStore();

onMounted(async () => {
  await authStore.initialize();
  if (authStore.isAuthenticated) {
    await profilesStore.loadProfile();
  }
});
</script>

<template>
  <RouterView />
</template>
