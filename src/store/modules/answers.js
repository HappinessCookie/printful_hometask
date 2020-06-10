export default {
  namespaced: true,
  state: () => ({
    list: [],
  }),
  getters: {
    list(state) {
      return state.list;
    },
    getQuestionAnswersById(state, getters) {
      return questionId => {
        return getters.list.filter(answer => answer.questionId === questionId);
      };
    },
  },
  actions: {
    async load({ commit }, { quizId, questionId }) {
      const response = await fetch(`https://printful.com/test-quiz.php?action=answers&quizId=${quizId}&questionId=${questionId}`);
      const answers = await response.json();
      answers.forEach(answer => answer.questionId = questionId);
      commit('addQuestions', answers);
    },
  },
  mutations: {
    addQuestions(state, payload) {
      state.list.push(...payload);
    },
  },
};
