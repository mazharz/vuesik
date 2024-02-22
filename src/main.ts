import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { hideCursor } from "./lib/directive/hide-cursor";

const app = createApp(App);
app.directive("hide-cursor", hideCursor);
app.mount("#app");
