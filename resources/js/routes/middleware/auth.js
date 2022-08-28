import cookie from "../../helpers/cookie";

export default function auth(to, from, next) {
  if (!cookie.getCookie("access_token")) {
    next("/");
  }

  next();
}
