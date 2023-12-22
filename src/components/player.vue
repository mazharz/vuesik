<script setup lang="ts">
const props = defineProps<{
  file: File | null;
}>();

import { ref, watch } from "vue";

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
  <audio ref="player"></audio>
  <button @click="playPauseHandler">
    <img v-if="!isPlaying" src="../assets/play.svg" />
    <img v-if="isPlaying" src="../assets/pause.svg" />
  </button>
</template>

<style scoped>
button {
  background: none;
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
