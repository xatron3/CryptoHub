import { getPosts } from "../../services/posts";

const posts = {
  namespaced: true,
  state: () => ({
    posts: {},
  }),
  mutations: {
    setPosts(state, data) {
      state.posts = data;
    },
  },
  actions: {
    async load(context, data) {
      const posts = await getPosts();

      context.commit("setPosts", posts);
    },
  },
  getters: {
    all: (state) => {
      return state.posts;
    },
    get: (state) => (slug) => {
      return state.posts.find((post) => post.slug === slug);
    },
  },
};

export default posts;
