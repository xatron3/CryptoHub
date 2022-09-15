import "./bootstrap";

// App Imports
import { createApp } from "vue";
import App from "./App.vue";

// Others
import { router } from "./routes";
import store from "./store/store";

// Vue Plugins
import Toast from "vue-toastification";
import { vfmPlugin } from "vue-final-modal";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

// Components
import Input from "./components/Input.vue";
import Select from "./components/Select.vue";
import Button from "./components/Button.vue";

const app = createApp(App);

app.component("Input", Input);
app.component("Select", Select);
app.component("Button", Button);
app.component("Datepicker", Datepicker);

app.use(Toast);
app.use(vfmPlugin);
app.use(store);
app.use(router);
app.mount("#app");
