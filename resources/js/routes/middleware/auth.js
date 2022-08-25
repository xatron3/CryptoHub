var authed = true;

export default function auth(to, from, next) {
  if (!authed) {
    next("/");
  }

  next();
}
