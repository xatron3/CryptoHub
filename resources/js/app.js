import "./bootstrap";
import { createApp } from "vue";
import App from "./Pages/App/App.vue";
import "../css/app.css";
import { router } from "./routes";
import store from "./store/store";
import Toast from "vue-toastification";
import { vfmPlugin } from "vue-final-modal";

// Components
import Input from "./components/Input.vue";
import Select from "./components/Select.vue";
import Button from "./components/Button.vue";

const app = createApp(App);

app.component("Input", Input);
app.component("Select", Select);
app.component("Button", Button);

app.use(Toast);
app.use(vfmPlugin);
app.use(store);
app.use(router);
app.mount("#app");
