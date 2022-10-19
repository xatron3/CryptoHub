import store from "../../store/store";

export default function auth(to, from, next) {
  store.dispatch("user/getUser").then(
    (res) => {
      if (res.is_admin === 1) {
        next();
      } else {
        next("/dashboard");
      }
    },
    (err) => {
      next("/dashboard");
    }
  );
}
