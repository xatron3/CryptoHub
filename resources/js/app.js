import "./bootstrap";
import { createApp } from "vue";
import App from "./Pages/App/App.vue";
import "../css/app.css";
import { router } from "./routes";
import store from "./store/store";

import { globalCookiesConfig } from "vue3-cookies";

globalCookiesConfig({
  expireTimes: "30d",
  path: "/",
  domain: "",
  secure: true,
  sameSite: "None",
});

const app = createApp(App);

router.beforeEach((to) => {
  document.title = `${import.meta.env.VITE_APP_NAME} - ${to.name}`;
});

app.use(store);
app.use(router);

app.mount("#app");
