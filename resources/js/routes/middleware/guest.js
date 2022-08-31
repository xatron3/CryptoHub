import cookie from "../../helpers/cookie";

export default function guest(to, from, next) {
  if (cookie.getItem("access_token")) {
    next("/dashboard");
  }

  next();
}
