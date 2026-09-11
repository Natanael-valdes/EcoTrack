<script setup>
import { ref } from "vue";
import { addPost } from "../stores/posts";

const text = ref("");
const file = ref(null);
const fileInput = ref(null);

function onFileChange(e) {
  file.value = e.target.files[0] || null;
}

function handlePost() {
  const trimmed = text.value.trim();

  if (trimmed === "" && !file.value) {
    alert("Escribe algo o selecciona una imagen");
    return;
  }

  addPost(trimmed, file.value);

  text.value = "";
  file.value = null;
  if (fileInput.value) fileInput.value.value = "";
}
</script>

<template>
  <div class="post-box">
    <input
      id="postInput"
      type="text"
      v-model="text"
      placeholder="¿Qué estás pensando?"
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

    <button id="postBtn" @click="handlePost">Post</button>
  </div>
</template>

<style scoped>
.post-box {
  background: white;
  padding: 15px;
  border-radius: 12px;
  margin: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
}

.post-box input[type="text"] {
  width: 60dvh;
  padding: 10px;
  border-radius: 25px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.post-box input[type="text"]:focus {
  border-color: #1877f2;
}

.post-box input[type="file"] {
  margin-bottom: 10px;
}

.post-box button {
  width: 20%;
  padding: 1.2%;
  border: none;
  background-color: #6b9071;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
}

.post-box button:hover {
  background-color: #375534;
}

.custom-file-upload {
  display: inline-block;
  padding: 1% 1%;
  background-color: #689071;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 10px;
  border: none;
  transition: background-color 0.2s;
  margin-left: 1%;
  margin-right: 1%;
}

.custom-file-upload:hover {
  background-color: #375534;
}

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

@media (max-width: 900px) {
  .post-box button {
    width: 30%;
    padding: 2%;
  }
}
</style>
