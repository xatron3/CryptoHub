/**
 * Get all positions
 * @param {boolean} grouped
 * @param {boolean} closed
 * @returns
 */
export async function getPosition(params = {}) {
  let result;
  let res = await axios.get("/api/positions", {
    params: {
      grouped: params.grouped ? params.grouped : false,
      closed: params.closed ? params.closed : false,
    },
  });

  if (res.data.data) {
    result = await res.data.data;
  } else {
    result = await res.data;
  }

  return result;
}

/**
 * Add new position
 * @param {int} buy_amount
 * @param {int} buy_asset_id
 * @param {int} sell_amount
 * @param {int} sell_amount_id
 */
export async function addPosition(data) {
  if (
    !data.buy_amount ||
    !data.buy_asset_id ||
    !data.sell_amount ||
    !data.sell_asset_id
  ) {
    return {
      message: "Fill all fields",
      status: 500,
    };
  }

  let res = await axios.post("/api/position/add", {
    buy_amount: data.buy_amount,
    buy_asset_id: data.buy_asset_id,
    sell_amount: data.sell_amount,
    sell_asset_id: data.sell_asset_id,
  });

  return {
    message: "Position was added",
    status: 200,
  };
}

/**
 * Cloase position by ID
 * @param {int} id
 * @param {int} amount
 * @returns
 */
export async function closePosition(data) {
  if (!data.id || !data.amount) {
    return {
      message: "Fill all fields",
      status: 500,
    };
  }

  let res = await axios.post("/api/position/close", {
    id: data.id,
    close_amount: data.amount,
  });

  return {
    message: "Position was succesfully closed",
    status: 200,
  };
}
