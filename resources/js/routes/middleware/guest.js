export default function guest(to, from, next) {
  if (localStorage.getItem("access_token")) {
    next("/dashboard");
  }

  next();
}
