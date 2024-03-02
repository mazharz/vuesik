import { Directive } from "vue";
import { CursorHelper } from "../helper/cursor";

export const hideCursor: Directive = {
  beforeMount(el) {
    el.addEventListener("mouseover", () => {
      CursorHelper.stickToElement(el);
    });

    el.addEventListener("mouseout", () => {
      CursorHelper.restore();
    });
  },
};
