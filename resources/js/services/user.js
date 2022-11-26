import axios from "axios";
import store from "../store/store.js";

export async function getUser(params = {}) {
  let user, res;

  if (params.id) {
    res = await axios.get("/api/user", {
      params: {
        id: params.id,
      },
    });
  } else {
    res = await axios.get("/api/user");
  }

  if (res.data.hasOwnProperty("data")) {
    user = res.data.data[0];
  } else {
    user = undefined;
  }
  return user;
}

export async function allUsers() {
  let res = await axios.get("/api/users");
  let user;

  if (res.data.hasOwnProperty("data")) {
    user = res.data.data;
  } else {
    user = undefined;
  }
  return user;
}

export async function register(data) {
  let res = await axios.post("/api/register", data);

  return res;
}

export async function updateUser(data) {
  let res = await axios.post("/api/user/update", data);
  let user;

  if (res.data.hasOwnProperty("data")) {
    user = res.data.data[0];
  }

  if (!data.user_id) store.commit("user/setUser", user);

  return res.data;
}
