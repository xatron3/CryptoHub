import "./bootstrap";
import { createApp } from "vue";
import App from "./Pages/App/App.vue";
import "../css/app.css";
import router from "./routes";

const app = createApp(App);

router.beforeEach((to) => {
  document.title = `${import.meta.env.VITE_APP_NAME} - ${to.name}`;
});

app.use(router);

app.mount("#app");
