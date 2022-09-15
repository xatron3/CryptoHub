import store from "../../store/store";

export default function auth(to, from, next) {
  if (1 !== 1) {
    next("/dashboard");
  }

  next();
}
