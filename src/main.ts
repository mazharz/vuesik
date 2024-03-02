import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { hideCursor } from "./lib/directive/hide-cursor";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.directive("hide-cursor", hideCursor);
app.mount("#app");
