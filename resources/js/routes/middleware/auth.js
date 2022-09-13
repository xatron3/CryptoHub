import cookie from "../../helpers/cookie";

export default function auth(to, from, next) {
  console.log(cookie.getItem("access_token"));
  if (!cookie.getItem("access_token")) {
    next("/");
  }

  next();
}
