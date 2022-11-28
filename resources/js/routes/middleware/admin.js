import store from "../../store/store";

export default function auth(to, from, next) {
  store.commit("app/setViewType", "authed");
  store.dispatch("user/getUser").then(
    (res) => {
      if (store.getters["user/role"] > 50) {
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
