import { getUser } from "../../services/user";
import { getPosition } from "../../services/positions";

const user = {
  namespaced: true,
  state: () => ({
    info: {},
  }),
  mutations: {
    setUser(state, userInfo) {
      state.info = userInfo;
    },
  },
  actions: {
    async getUserData({ dispatch }) {
      await dispatch("getUser");
      await dispatch("positions/getPositions", "", { root: true });
    },
    getUser(context, data) {
      return new Promise(async (resolve, reject) => {
        if (localStorage.getItem("access_token")) {
          let res = await getUser();
          console.log(res);

          if (res !== undefined) {
            context.commit("setUser", res);
            resolve(res);
          } else {
            localStorage.removeItem("access_token");
            reject("No user found");
          }
        } else {
          context.commit("setUser", {});
          resolve("No Access Token");
        }
      });
    },
  },
  getters: {
    activePositions(state) {
      return state.info.positions.filter((item) => {
        return item.close_amount === null;
      });
    },
    closedPositions(state) {
      return state.info.positions.filter((item) => {
        return item.close_amount !== null;
      });
    },
    userData(state, getters) {
      return state.info;
    },
    role(state, getters) {
      return state.info.level;
    },
    loggedIn(state, getters) {
      const loggedIn = Object.keys(state.info).length !== 0 ? true : false;

      return loggedIn;
    },
    isAdmin(state, getters) {
      const isAdmin =
        Object.keys(state.info).length !== 0 ? state.info.role : 0;

      return isAdmin;
    },
    notes(state, getters) {
      return state.info.notes;
    },
    note: (state) => (id) => {
      return state.info.notes.find((note) => note.id == id);
    },
  },
};

export default user;
