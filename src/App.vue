<script setup lang="ts">
import { ref } from "vue";
import Loader from "./components/loader.vue";
import Player from "./components/player.vue";
import Cursor from "./components/cursor.vue";

const file = ref<File | null>(null);

const setFile = (f: File) => {
  file.value = f;
};
</script>

<template>
  <Loader v-if="!file" @set-file="setFile" />
  <Player v-if="!!file" :file="file" @set-file="setFile" />
  <Cursor />
</template>
