<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps<{
  isPlaying: boolean;
  player: HTMLAudioElement | null;
}>();

const canvas = ref<HTMLCanvasElement | null>(null);
const ctx = ref<CanvasRenderingContext2D | null>(null);

const audioContext = new window.AudioContext();

const analyser = audioContext.createAnalyser();
analyser.fftSize = 256;

const bufferLength = analyser.frequencyBinCount;
const frequencyData = new Uint8Array(bufferLength);

// this is like a bridge connecting our audio element
// to the analyser so analyser has access to the same
// audio information
const source = ref<MediaElementAudioSourceNode | null>(null);
analyser.connect(audioContext.destination);

function draw() {
  if (!canvas.value || !ctx.value) return;

  // clear canvas
  ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height);

  // populate the frequency data
  analyser.getByteFrequencyData(frequencyData);

  for (let i = 0; i < bufferLength; i++) {
    ctx.value.beginPath();
    ctx.value.lineWidth = 2;
    ctx.value.strokeStyle =
      "rgba(0,100,0," + (frequencyData[i] - i) / 256 + ")";
    ctx.value.arc(312, 312, i + 104, 0, 2 * Math.PI);
    ctx.value.stroke();
  }

  // only continue drawing if playing
  if (props.isPlaying) {
    requestAnimationFrame(draw);
  }
}

watch(canvas, (canvas) => {
  if (canvas) {
    ctx.value = canvas.getContext("2d") as CanvasRenderingContext2D;
  }
});

watch(
  () => props.isPlaying,
  (isPlaying) => {
    if (isPlaying) {
      draw();
    }
  }
);

watch(
  () => props.player,
  (player) => {
    if (!player) return;

    source.value = audioContext.createMediaElementSource(player);
    source.value.connect(analyser);
  }
);
</script>

<template>
  <canvas
    width="624"
    height="624"
    ref="canvas"
    :class="{ active: isPlaying }"
  ></canvas>
</template>

<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-33.33%, -33.33%);
  z-index: -1;
  transition: opacity 0.5s ease;
  opacity: 0;
  pointer-events: none;
}

canvas.active {
  opacity: 1;
}
</style>
