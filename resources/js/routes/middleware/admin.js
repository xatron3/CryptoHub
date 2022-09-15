import store from "../../store/store";

export default function auth(to, from, next) {
  if (store.state.user === null) {
    next("/dashboard");
  }

  next();
}
