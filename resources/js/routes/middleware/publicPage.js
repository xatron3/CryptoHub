import store from "../../store/store";

export default function publicPage(to, from, next) {
  store.commit("app/setViewType", "public");
  next();
}
