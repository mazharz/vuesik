import { Directive } from "vue";

export const hideCursor: Directive = {
  beforeMount(el) {
    el.addEventListener("mouseover", () => {
      const cursor = document.getElementById("cursor");
      if (!cursor) return;

      // @ts-ignore
      window.shouldSkip = true;
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

      // @ts-ignore
      window.shouldSkip = false;
      cursor.style.transition = `transform 0.05s ease, opacity 0.3s ease, width 0.3s ease, height 0.3s ease`;
      cursor.style.width = `2rem`;
      cursor.style.height = `2rem`;
    });
  },
};
