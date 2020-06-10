export default {
  namespaced: true,
  state: () => ({
    list: [],
  }),
  getters: {
    list(state) {
      return state.list;
    },
    getQuestionById(state, getters) {
      return id => {
        return getters.list.find(question => question.id === id);
      };
    },
    getQuizQuestionsById(state, getters) {
      return quizId => {
        return getters.list.filter(question => question.quizId === quizId);
      };
    },
  },
  actions: {
    async load({ commit }, { quizId }) {
      const response = await fetch(`https://printful.com/test-quiz.php?action=questions&quizId=${quizId}`);
      const questions = await response.json();
      questions.forEach(question => question.quizId = quizId);
      commit('addQuestions', questions);
    },
  },
  mutations: {
    addQuestions(state, payload) {
      state.list.push(...payload);
    },
  },
};
