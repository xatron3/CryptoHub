/**
 * Get all assets
 * @returns {array}
 */
export async function getAssets() {
  let res = await axios.get("/api/assets");

  return res.data.data;
}

/**
 * Get all coingecko items
 * @returns {array}
 */
export async function getCoingeckoList() {
  let res = await axios.get("https://api.coingecko.com/api/v3/coins/list");

  return res.data;
}
