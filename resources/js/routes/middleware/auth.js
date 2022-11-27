export default function auth(to, from, next) {
  if (!localStorage.getItem("access_token")) {
    next("/login");
  }

  next();
}
