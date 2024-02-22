<script setup lang="ts">
import { onMounted, ref } from "vue";

const cursor = ref<HTMLDivElement | null>(null);

function updateCursorPosition(e: PointerEvent) {
  if (!cursor.value) return;
  // @ts-ignore
  if (window.shouldSkip) return;
  cursor.value.style.transform = `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`;
}

onMounted(() => {
  document.body.addEventListener("pointermove", updateCursorPosition);
});
</script>

<template>
  <div id="cursor" ref="cursor"></div>
</template>

<style scoped>
#cursor {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  background: #fff;
  opacity: 0.3;
  transform: translate(-50%, -50%);
  transition: transform 0.05s ease, opacity 0.3s ease, width 0.3s ease,
    height 0.3s ease;
}
</style>
