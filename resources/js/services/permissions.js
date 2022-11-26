export async function getRoles() {
  let res = await axios.get("/api/roles");
  let roles;

  if (res.data.hasOwnProperty("data")) {
    roles = res.data.data;
  } else {
    roles = undefined;
  }
  return roles;
}

export async function addRole(data) {
  let res = await axios.post("/api/roles/add", data);

  return res;
}
