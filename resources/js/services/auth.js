/**
 * Auth user
 * @param {string} email
 * @param {string} password
 * @returns
 */
export async function auth(data) {
  let res = await axios.post("api/login", {
    email: data.email,
    password: data.password,
  });

  return res;
}

export async function getUser() {
  let res = await axios.get("/api/user");

  return res;
}
