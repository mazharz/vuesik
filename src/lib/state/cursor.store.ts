import { defineStore } from "pinia";
import { ref } from "vue";

export const useCursorStore = defineStore("cursor", () => {
  const shouldSkipCursorRepositioning = ref(false);

  function setShouldSkipCursorRepositioning(value: boolean) {
    shouldSkipCursorRepositioning.value = value;
  }

  return { shouldSkipCursorRepositioning, setShouldSkipCursorRepositioning };
});
