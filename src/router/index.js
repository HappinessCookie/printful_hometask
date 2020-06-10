import Auth from '~/pages/Auth';
import Quiz from '~/pages/Quiz';

import store from '~/store';

function requireAuth(to, from, next) {
	if (!store.getters['user/name']) {
		next({ name: 'auth' });
	} else {
		next();
	}
}

export default [
	{
		name: 'auth',
		path: '/',
		component: Auth,
	},
	{
		name: 'quiz',
		path: '/quiz/:id',
		component: Quiz,
		props: true,
		beforeEnter: requireAuth,
	},
];
