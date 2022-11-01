import { getUser } from "../../services/auth";
import { getPosition } from "../../services/positions";

const user = {
  namespaced: true,
  state: () => ({
    info: {},
    positions: {},
  }),
  mutations: {
    setUser(state, userInfo) {
      state.info = userInfo;
    },
    setPositions(state, data) {
      state.positions = data;
    },
  },
  actions: {
    async getUserData({ dispatch }) {
      await dispatch("getUser");
      await dispatch("getPositions");
    },
    getUser(context, data) {
      return new Promise(async (resolve, reject) => {
        if (localStorage.getItem("access_token")) {
          if (Object.keys(context.state.info).length === 0) {
            let res = await getUser();

            if (res !== undefined) {
              context.commit("setUser", res);
              resolve(res);
            } else {
              localStorage.removeItem("access_token");
              reject("No user found");
            }
          } else {
            resolve(context.state.info);
          }
        } else {
          reject("No access token found");
        }
      });
    },
    async getPositions(context, data) {
      const res = await getPosition();

      context.commit("setPositions", res);
    },
  },
  getters: {
    loggedIn(state, getters) {
      const loggedIn = Object.keys(state.info).length !== 0 ? true : false;

      return loggedIn;
    },
    isAdmin(state, getters) {
      const isAdmin =
        Object.keys(state.info).length !== 0 ? state.info.is_admin : 0;

      return isAdmin;
    },
    losingPositions: (state) =>
      [...state.positions]
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
        }),
    profitPositions: (state) =>
      [...state.positions]
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
        }),
  },
};

export default user;
