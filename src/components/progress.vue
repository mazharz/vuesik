<script setup lang="ts">
const emit = defineEmits<{
  (e: "end-of-song"): void;
}>();

import { onBeforeUnmount, ref, watch } from "vue";

const progress = ref<HTMLDivElement | null>(null);
const progressFill = ref<HTMLDivElement | null>(null);

const props = defineProps<{
  player: HTMLAudioElement | null;
  file: File;
}>();

const onTimeUpdate = () => {
  if (!props.player || !progressFill.value) return;

  const progress = (props.player.currentTime / props.player.duration) * 100;
  progressFill.value.style.transform = `translateX(-${100 - progress}%)`;

  if (progress >= 100) {
    emit("end-of-song");
  }
};

const onProgressChange = (e: MouseEvent) => {
  if (!progress.value || !props.player) return;

  const xPosition = e.clientX - progress.value?.getBoundingClientRect().left;
  const progressWidth = progress.value.clientWidth;
  const seek = (xPosition / progressWidth) * props.player.duration;
  props.player.currentTime = seek;
};

watch(
  () => props.file,
  () => {
    if (progressFill.value) {
      progressFill.value.style.transform = `translateX(-100%)`;
    }
  }
);
watch(progress, (progress) => {
  if (!progress) return;

  progress.addEventListener("click", onProgressChange);
});
watch([() => props.player, progressFill], ([player, progressFill]) => {
  if (!player || !progressFill) return;

  player.addEventListener("timeupdate", onTimeUpdate);
});
onBeforeUnmount(() => {
  props.player?.removeEventListener("timeupdate", onTimeUpdate);
  progress.value?.removeEventListener("click", onProgressChange);
});
</script>

<template>
  <div class="container" ref="progress">
    <div class="progress">
      <div class="progress-fill" ref="progressFill"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 20rem;
  padding: 0.5rem 0;
  cursor: pointer;
}

.progress {
  width: 100%;
  height: 0.1rem;
  background-color: gray;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  position: absolute;
  inset: 0;
  background-color: #080;
  transform: translateX(-100%);
  transition: transform 0.5s ease;
}
</style>
