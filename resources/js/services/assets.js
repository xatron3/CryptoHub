/**
 * Get all assets
 * @param {string} sort_by Sort the assets
 * @returns {array}
 */
export async function getAssets(params = {}) {
  let sort_by;

  if (params.sort_by !== undefined) {
    sort_by = params.sort_by;
  } else {
    sort_by = null;
  }

  let res = await axios.get("/api/assets", {
    params: {
      sort_by: sort_by,
    },
  });

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
