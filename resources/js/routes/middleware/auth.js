import cookie from "../../helpers/cookie";

export default function auth(to, from, next) {
  if (!cookie.getItem("access_token")) {
    next("/");
  }

  next();
}
