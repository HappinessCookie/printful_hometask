export default {
	namespaced: true,
	state: () => ({
		name: null,
		activeQuizId: null,
		answers: [],
	}),
	getters: {
		name(state) {
			return state.name;
		},
		activeQuizId(state) {
			return state.activeQuizId;
		},
		answers(state) {
			return state.answers;
		},
	},
	actions: {
		setName({ commit }, name) {
			commit('setName', name);
		},
		setActiveQuiz({ commit }, id) {
			commit('setActiveQuiz', id);
		},
		addAnswer({ commit }, payload) {
			commit('addAnswer', payload);
		},
		resetAnswers({ commit }) {
			commit('resetAnswers');
		},
	},
	mutations: {
		setName(state, payload) {
			state.name = payload;
		},
		setActiveQuiz(state, payload) {
			state.activeQuizId = payload;
		},
		addAnswer(state, payload) {
			state.answers.push(payload);
		},
		resetAnswers(state) {
			state.answers = [];
		},
	},
};
