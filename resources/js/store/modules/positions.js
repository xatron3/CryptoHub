import { getPosition } from "../../services/positions";

const positions = {
  namespaced: true,
  state: () => ({
    positions: {},
    positionGrouped: true,
    positionSort: "profit",
  }),
  mutations: {
    setPositions(state, data) {
      state.positions = data;
    },
    setPositionsGrouped(state, data) {
      state.positionGrouped = data;
    },
    setPositionSort(state, data) {
      state.positionSort = data;
    },
  },
  actions: {
    async getPositions(context, data) {
      let res;

      if (context.rootGetters["user/loggedIn"]) {
        res = await getPosition({
          grouped: context.state.positionGrouped,
        });
      } else {
        res = {};
      }

      context.commit("setPositions", res);
    },
    async updatePositions(context, data) {
      context.commit("setPositionsGrouped", data);
      await context.dispatch("getPositions");
    },
  },
  getters: {
    totalPositionsValue(state, getters, rootState, rootGetters) {
      if (Object.keys(state.positions).length > 0) {
        const groupedData = {};

        [...state.positions].forEach((position) => {
          const symbol = position.sell_asset_symbol;

          if (!groupedData.hasOwnProperty(symbol)) {
            groupedData[symbol] = {
              logo: rootGetters["assets/get"](symbol).logo,
              sell_amount: position.sell_amount,
              pnl: position.profit,
            };
          } else {
            groupedData[symbol].sell_amount =
              groupedData[symbol].sell_amount + position.sell_amount;
            groupedData[symbol].pnl = groupedData[symbol].pnl + position.profit;
          }
        });

        return groupedData;
      } else {
        return {};
      }
    },
    losingPositions: (state) =>
      Object.keys(state.positions).length > 0
        ? [...state.positions]
            .filter((item) => {
              return item.current_sell_price < item.buy_price;
            })
            .sort(function (a, b) {
              const aPNL = nums.getPercentageIncrease(
                a.current_sell_price,
                a.buy_price
              );

              const bPNL = nums.getPercentageIncrease(
                b.current_sell_price,
                b.buy_price
              );

              return bPNL - aPNL;
            })
        : {},
    profitPositions: (state) =>
      Object.keys(state.positions).length > 0
        ? [...state.positions]
            .filter((item) => {
              return item.current_sell_price >= item.buy_price;
            })
            .sort(function (a, b) {
              const aPNL = nums.getPercentageIncrease(
                a.current_sell_price,
                a.buy_price
              );

              const bPNL = nums.getPercentageIncrease(
                b.current_sell_price,
                b.buy_price
              );

              return bPNL - aPNL;
            })
        : {},
    allPositions(state, getters) {
      if (state.positionSort === "profit") {
        return [...state.positions].sort(function (a, b) {
          const aPNL = nums.getPercentageIncrease(
            a.current_sell_price,
            a.buy_price
          );

          const bPNL = nums.getPercentageIncrease(
            b.current_sell_price,
            b.buy_price
          );

          return bPNL - aPNL;
        });
      } else {
        return state.positions;
      }
    },
  },
};

export default positions;
