import "./bootstrap";

// App Imports
import { createApp } from "vue";
import { createHead } from "@vueuse/head";
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
import HeaderText from "./components/HeaderText.vue";
import Select from "./components/Select.vue";
import Button from "./components/Button.vue";
import Modal from "./components/Modal.vue";
import Table from "./components/Table/Table.vue";

const app = createApp(App);
const head = createHead();

app.component("Input", Input);
app.component("HeaderText", HeaderText);
app.component("Select", Select);
app.component("Button", Button);
app.component("Modal", Modal);
app.component("Table", Table);
app.component("Datepicker", Datepicker); // TODO: change to a more robust library

app.use(Toast);
app.use(vfmPlugin);
app.use(store);
app.use(router);
app.use(head);
app.mount("#app");
