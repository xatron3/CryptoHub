import "./bootstrap";
import { createApp } from "vue";
import App from "./components/App.vue";
import "../css/app.css";
import router from "./routes";

const app = createApp(App);

app.use(router);

app.mount("#app");
