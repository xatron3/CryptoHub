import store from "../../store/store";
export default function auth(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    store.commit("app/setViewType", "public");
    next("/");
  }

  store.commit("app/setViewType", "authed");
  next();
}
