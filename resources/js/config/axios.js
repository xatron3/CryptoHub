import axios from "axios";
let subscribers = [];
window.axios = axios;

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

    if (
      data.message === "Token has expired and can no longer be refreshed" ||
      data.message === "The token has been blacklisted" ||
      data.message === "Server Error"
    ) {
      // TODO: Send to login page if this happens
      // TODO: Remove "Server Error" just temp fix to fix production bug with getting user when token is blacklisted
      // Maybe just check for data.status if its 500 send to login and remove access_token.
      localStorage.removeItem("access_token");
    }

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
