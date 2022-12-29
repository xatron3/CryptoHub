/**
 * Get all assets
 * @param {string} sort_by Sort the assets
 * @returns {array}
 */
export async function getAssets(params = {}) {
  let res = await axios.get("/api/assets", {
    params: {
      id: params.id ? params.id : null,
      page: params.page ? params.page : 1,
      paginate: params.paginate ? params.paginate : null,
    },
  });

  let data;

  data = res.data.data;

  // Used to limit amout of assets returned
  if (params.limit !== undefined) {
    data = data.slice(0, parseInt(params.limit));
  }

  let response = {
    data: data,
    meta: res.data.meta,
  };

  return response;
}

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

  return res.data;
}
