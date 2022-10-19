import { getUser } from "../../services/auth";

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
  },
};

export default user;
