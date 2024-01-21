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

  const progressPercentage =
    (props.player.currentTime / props.player.duration) * 100;
  const progressPixel = Math.round((progressPercentage * 285) / 100);
  const remainingAmount = 285 - progressPixel;
  progressFill.value.style.strokeDashoffset = `${remainingAmount}px`;

  if (progressPercentage >= 100) {
    emit("end-of-song");
  }
};

const onProgressChange = (e: WheelEvent) => {
  if (!progress.value || !props.player) return;

  const seekAmount = e.deltaY > 0 ? -2 : 2;
  props.player.currentTime += seekAmount;
};

watch(
  () => props.file,
  () => {
    if (progressFill.value) {
      progressFill.value.style.strokeDashoffset = `285px`;
    }
  }
);
watch(progress, (progress) => {
  if (!progress) return;

  progress.addEventListener("wheel", onProgressChange);
});
watch([() => props.player, progressFill], ([player, progressFill]) => {
  if (!player || !progressFill) return;

  player.addEventListener("timeupdate", onTimeUpdate);
});
onBeforeUnmount(() => {
  props.player?.removeEventListener("timeupdate", onTimeUpdate);
  progress.value?.removeEventListener("wheel", onProgressChange);
});
</script>

<template>
  <div class="progress" ref="progress">
    <svg viewBox="0 0 100 100">
      <circle class="inactive" cx="50" cy="50" r="45" />
      <circle class="active" cx="50" cy="50" r="45" ref="progressFill" />
    </svg>
  </div>
</template>

<style scoped>
.progress {
  transform: rotate(-90deg);
  position: absolute;
  inset: 0;
  background-color: transparent;
}

svg circle {
  stroke-width: 0.1rem;
  stroke-linecap: round;
  pointer-events: stroke;
  fill: none;
  transition: stroke-dashoffset 0.5s ease, stroke-dasharray 0.5s ease;
}

svg circle.inactive {
  stroke: transparent;
}

svg circle.active {
  stroke: #080;
  stroke-dashoffset: 285px;
  stroke-dasharray: 285px;
}
</style>
