<script setup lang="ts">
import { ref, watch } from "vue";
import Visualizer from "./visualizer.vue";

const props = defineProps<{
  file: File;
}>();

const player = ref<HTMLAudioElement | null>(null);
const isPlaying = ref<boolean>(false);

const playHandler = () => {
  isPlaying.value = true;
  player.value?.play();
};
const pauseHandler = () => {
  isPlaying.value = false;
  player.value?.pause();
};

const playPauseHandler = () => {
  if (isPlaying.value) {
    pauseHandler();
  } else {
    playHandler();
  }
};

watch(player, (player) => {
  if (props.file && player) {
    player.src = window.URL.createObjectURL(props.file);
  }
});
</script>

<template>
  <div class="player-wrapper">
    <audio ref="player"></audio>
    <button @click="playPauseHandler">
      <img v-if="!isPlaying" src="../assets/play.svg" />
      <img v-if="isPlaying" src="../assets/pause.svg" />
    </button>
    <Visualizer :is-playing="isPlaying" :player="player" />
  </div>
</template>

<style scoped>
.player-wrapper {
  position: relative;
}

button {
  background: #000;
  border: none;
  outline: none;
  cursor: pointer;
  width: 13rem;
  height: 13rem;
  place-items: center;
  border-radius: 100%;
  transition: box-shadow 0.5s ease;
  box-shadow: 0 0 20rem #0f0;
  user-select: none;
}

button:hover {
  box-shadow: 0 0 14rem #0f0;
}

button:active {
  box-shadow: 0 0 12rem #0f0;
}

img {
  width: 3rem;
  height: 3rem;
}
</style>
