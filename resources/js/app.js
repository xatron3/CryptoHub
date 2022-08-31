import "./bootstrap";
import { createApp } from "vue";
import App from "./Pages/App/App.vue";
import "../css/app.css";
import { router } from "./routes";
import store from "./store/store";

const app = createApp(App);

let subscribers = [];

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${cookie.getItem(
      "access_token"
    )}`;

    return config;
  },
  (error) => {
    return error;
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const {
      config,
      response: { status, data },
    } = error;

    const originalRequest = config;

    if (status === 401 && data.message == "Token Expired") {
      cookie.setItem("access_token", data.token);

      subscribers = [];

      const requestSubscribers = new Promise((resolve) => {
        subscribeTokenRerfesh(() => {
          resolve(axios(originalRequest));
        });
      });

      onRefreshed();

      return requestSubscribers;
    }

    if (status === 500 && data.message === "The token has been blacklisted") {
      cookie.removeItem("access_token", "/");
      router.push("/");
    }
  }
);

function subscribeTokenRerfesh(cb) {
  subscribers.push(cb);
}

function onRefreshed() {
  subscribers.map((cb) => cb());
}

router.beforeEach((to) => {
  document.title = `${import.meta.env.VITE_APP_NAME} - ${to.name}`;
});

app.use(store);
app.use(router);

app.mount("#app");
