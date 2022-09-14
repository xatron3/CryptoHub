import _ from "lodash";
window._ = _;

import axios from "axios";
import nums from "./helpers/numbers";

window.axios = axios;
window.nums = nums;

window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

let subscribers = [];

axios.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${localStorage.getItem(
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
      localStorage.setItem("access_token", data.token);

      subscribers = [];

      const requestSubscribers = new Promise((resolve) => {
        subscribeTokenRerfesh(() => {
          resolve(axios(originalRequest));
        });
      });

      onRefreshed();

      return requestSubscribers;
    }
  }
);

function subscribeTokenRerfesh(cb) {
  subscribers.push(cb);
}

function onRefreshed() {
  subscribers.map((cb) => cb());
}
