import store from "../store/store.js";

/**
 * Get all positions
 * @param {boolean} grouped
 * @param {boolean} closed
 * @returns
 */
export async function getPosition(params = {}) {
  let res = await axios.get("/api/positions", {
    params: {
      grouped: params.grouped ? params.grouped : false,
      closed: params.closed ? params.closed : false,
      sell_asset: params.sell_asset ? params.sell_asset : null,
      buy_asset: params.buy_asset ? params.buy_asset : null,
      user_id: params.user_id ? params.user_id : null,
    },
  });

  // Add data from asset state to position
  res.data.data.forEach((obj) => {
    // Buy asset data
    let buyAssset = store.getters["assets/get"](obj.buy_asset_id);
    // Sell asset data
    let sellAsset = store.getters["assets/get"](obj.sell_asset_id);

    // Assign current sell price to position
    Object.assign(obj, {
      current_sell_price: buyAssset.current_price / sellAsset.current_price,
      buy_logo: buyAssset.logo,
      buy_symbol: buyAssset.symbol,
      sell_logo: sellAsset.logo,
      sell_symbol: sellAsset.symbol,
    });
  });

  if (params.sort_by === "profit") {
    res = res.data.data.sort(function (a, b) {
      const aPNL = nums.getPercentageIncrease(
        a.current_sell_price,
        a.buy_price
      );

      const bPNL = nums.getPercentageIncrease(
        b.current_sell_price,
        b.buy_price
      );

      if (params.sort_order === "desc") {
        return aPNL - bPNL;
      } else {
        return bPNL - aPNL;
      }
    });
  } else {
    res = res.data.data;
  }

  return res;
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
