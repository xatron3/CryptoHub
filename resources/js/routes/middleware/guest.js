import store from "../../store/store";

export default function guest(to, from, next) {
  if (localStorage.getItem("access_token")) {
    store.commit("app/setViewType", "authed");
    next("/dashboard");
  }

  store.commit("app/setViewType", "public");
  next();
}
