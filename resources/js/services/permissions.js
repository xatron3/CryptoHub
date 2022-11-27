/**
 * Get roles
 * @param {Object} params Parameters like id, limit etc.
 * @returns Roles
 */
export async function getRoles(params = {}) {
  let res = await axios.get("/api/roles", {
    params: {
      id: params.id ? params.id : null,
    },
  });

  if (res.data.hasOwnProperty("data")) {
    res = res.data;
  } else {
    res = undefined;
  }

  return res;
}

/**
 * Add new role
 * @param {Object} data Role information
 * @returns JSON data
 */
export async function updateRole(data) {
  let res = await axios.post("/api/roles/update", data);

  if (res.hasOwnProperty("data")) {
    res = res.data;
  } else {
    res = undefined;
  }

  return res;
}

/**
 * Add new role
 * @param {Object} data Role information
 * @returns JSON data
 */
export async function addRole(data) {
  let res = await axios.post("/api/roles/add", data);

  if (res.hasOwnProperty("data")) {
    res = res.data;
  } else {
    res = undefined;
  }

  return res;
}
