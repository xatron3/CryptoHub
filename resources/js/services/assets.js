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

  if (params.sort_by === "price_change") {
    if (params.sort_order === "desc") {
      data = res.data.data.sort(function (a, b) {
        return a.price_change_24h - b.price_change_24h;
      });
    } else {
      data = res.data.data.sort(function (a, b) {
        return b.price_change_24h - a.price_change_24h;
      });
    }
  } else if (params.sort_by === "market_cap") {
    if (params.sort_order === "desc") {
      data = res.data.data.sort(function (a, b) {
        return a.market_cap - b.market_cap;
      });
    } else {
      data = res.data.data.sort(function (a, b) {
        return b.market_cap - a.market_cap;
      });
    }
  } else {
    data = res.data.data;
  }

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
