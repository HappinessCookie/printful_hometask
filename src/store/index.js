import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import user from './modules/user';
import quizzes from './modules/quizzes';
import questions from './modules/questions';
import answers from './modules/answers';

export default new Vuex.Store({
  modules: {
    user,
    quizzes,
    questions,
    answers,
  },
});
