<script setup lang="ts">
const emit = defineEmits<{
  (e: "set-file", file: File): void;
}>();

import { ref, watch } from "vue";

const inputRef = ref<HTMLInputElement | null>(null);

watch(inputRef, (element) => {
  if (!element) return;

  element.addEventListener("change", () => {
    const file = element.files && element.files[0];
    if (file) {
      emit("set-file", file);
    }
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    // @ts-ignore
    window.shouldSkip = false;
    cursor.style.transition = `transform 0.05s ease, opacity 0.3s ease, width 0.3s ease, height 0.3s ease`;
    cursor.style.width = `2rem`;
    cursor.style.height = `2rem`;
  });
});

const openFileHandler = () => {
  inputRef.value?.click();
};
</script>

<template>
  <input type="file" accept="audio/*" ref="inputRef" />
  <div class="file-input" @click="openFileHandler" v-hide-cursor>
    Open a file
  </div>
</template>

<style scoped>
input {
  display: none;
}

.file-input {
  border-radius: 100%;
  width: 13rem;
  height: 13rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: box-shadow 0.5s ease;
  user-select: none;
  font-weight: 500;
}

.file-input:hover {
  box-shadow: 0 0 14rem #f00;
}

.file-input:active {
  box-shadow: 0 0 12rem #f00;
}
</style>
