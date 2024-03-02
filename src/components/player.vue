<script setup lang="ts">
import { ref, watch } from "vue";
import Visualizer from "./visualizer.vue";
import Progress from "./progress.vue";

const props = defineProps<{
  file: File;
}>();
const emit = defineEmits<{
  (e: "set-file", file: File): void;
}>();

const player = ref<HTMLAudioElement | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);
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

watch([player, () => props.file], ([player, file]) => {
  if (file && player) {
    player.src = window.URL.createObjectURL(file);
    isPlaying.value = false;
  }
});

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
  <div class="player-wrapper">
    <audio ref="player"></audio>
    <div class="player-circle" @click="playPauseHandler" v-hide-cursor>
      <Progress :player="player" :file="file" @end-of-song="pauseHandler" />
      <button class="play-pause">
        <img v-if="!isPlaying" src="../assets/play.svg" />
        <img v-if="isPlaying" src="../assets/pause.svg" />
      </button>
    </div>
    <Visualizer :is-playing="isPlaying" :player="player" />
    <div class="details">
      <div class="song-name" :title="file.name">
        {{ file.name.replace(/^\d+\.*\_*\s*|\.[^.]+$/g, "") }}
      </div>
      <input type="file" accept="audio/*" ref="inputRef" />
      <button class="reload" @click="openFileHandler" title="Change file" v-hide-cursor>
        <img src="../assets/load.svg" />
      </button>
    </div>
  </div>
</template>

<style scoped>
input {
  display: none;
}

.player-wrapper {
  position: relative;
}

.player-circle {
  position: relative;
  background: #000;
  width: 13rem;
  height: 13rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  transition: box-shadow 0.5s ease;
  box-shadow: 0 0 20rem #0f0;
}

.player-circle:hover {
  box-shadow: 0 0 14rem #0f0;
}

.player-circle:active {
  box-shadow: 0 0 12rem #0f0;
}

.details {
  position: absolute;
  top: 170%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

button.reload {
  background: transparent;
  border: none;
  outline: none;
  transform: scaleY(-100%);
  width: 3rem;
  height: 3rem;
}

.song-name {
  text-align: center;
  width: 30rem;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 500;
}

@media (max-width: 390px) {
  .song-name {
    width: 100%;
  }
}

button.play-pause {
  background: transparent;
  z-index: 1;
  border: none;
  outline: none;
  place-items: center;
  user-select: none;
}

img {
  width: 3rem;
  height: 3rem;
}

.reload img {
  width: 1.2rem;
  height: 1.2rem;
}
</style>
