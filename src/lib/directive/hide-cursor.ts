import { Directive } from "vue";
import { useCursorStore } from "../state/cursor.store";

export const hideCursor: Directive = {
  beforeMount(el) {
    const cursorStore = useCursorStore();

    el.addEventListener("mouseover", () => {
      const cursor = document.getElementById("cursor");
      if (!cursor) return;

      cursorStore.setShouldSkipCursorRepositioning(true);
      cursor.style.transition = `transform 0.5s ease, opacity 0.3s ease, width 0.3s ease, height 0.3s ease`;

      cursor.style.width = `${Math.round(el.offsetWidth)}px`;
      cursor.style.height = `${Math.round(el.offsetHeight)}px`;
      cursor.style.transform = `translate(${Math.round(
        el.getBoundingClientRect().x
      )}px, ${Math.round(el.getBoundingClientRect().y)}px)`;
      // if (cursor) cursor.style.opacity = "0";
    });

    el.addEventListener("mouseout", () => {
      const cursor = document.getElementById("cursor");
      if (!cursor) return;

      cursorStore.setShouldSkipCursorRepositioning(false);
      cursor.style.transition = `transform 0.05s ease, opacity 0.3s ease, width 0.3s ease, height 0.3s ease`;
      cursor.style.width = `2rem`;
      cursor.style.height = `2rem`;
    });
  },
};
