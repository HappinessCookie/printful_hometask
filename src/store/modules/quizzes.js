export default {
  namespaced: true,
  state: () => ({
    selectedId: null,
    list: [],
  }),
  getters: {
    current(state, getters) {
      return getters.list.find(quiz => quiz.id === state.selectedId);
    },
    list(state) {
      return state.list;
    },
  },
  actions: {
    async load({ commit }) {
      const response = await fetch('https://printful.com/test-quiz.php?action=quizzes');
      const data = await response.json();
      commit('setList', data);
    },
  },
  mutations: {
    setList(state, payload) {
      state.list = payload;
    },
  },
};
