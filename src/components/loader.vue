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
  });
});

const openFileHandler = () => {
  inputRef.value?.click();
};
</script>

<template>
  <input type="file" accept="audio/*" ref="inputRef" />
  <div class="file-input" @click="openFileHandler">Open a file</div>
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
  place-items: center;
  transition: box-shadow 0.5s ease;
  cursor: pointer;
  box-shadow: 0 0 20rem #f00;
  user-select: none;
}

.file-input:hover {
  box-shadow: 0 0 14rem #f00;
}

.file-input:active {
  box-shadow: 0 0 12rem #f00;
}
</style>
