/**
 * Get all assets
 * @param {string} sort_by Sort the assets
 * @returns {array}
 */
export async function getAssets() {
  let res = await axios.get("/api/assets");

  return res.data;
}

/**
 * Add new asset
 */
export async function addAsset(data) {
  let res = await axios.post("/api/asset/add", data);

  return res;
}

/**
 * Update asset
 * @param {*} data
 * @returns
 */
export async function updateAsset(data) {
  let res = await axios.post("/api/asset/update", data);

  return res;
}

/**
 * Get all coingecko items
 * @returns {array}
 */
export async function getCoingeckoList() {
  let res = await axios.get("https://api.coingecko.com/api/v3/coins/list");

  return res;
}
