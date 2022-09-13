import "./bootstrap";
import { createApp } from "vue";
import App from "./Pages/App/App.vue";
import "../css/app.css";
import { router } from "./routes";
import store from "./store/store";
import Toast from "vue-toastification";
import { vfmPlugin } from "vue-final-modal";

const app = createApp(App);

window.addEventListener("DOMContentLoaded", (event) => {
  app.use(Toast);
  app.use(vfmPlugin);
  app.use(store);
  app.use(router);

  app.mount("#app");
});
