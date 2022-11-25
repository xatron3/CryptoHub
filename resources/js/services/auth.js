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
