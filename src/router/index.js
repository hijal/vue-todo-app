import { createRouter, createWebHistory } from 'vue-router';

import Home from '../pages/Home.vue';

const routes = [
	{
		path: '/:filter',
		name: 'home',
		component: Home,
		props: true,
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to) => {
	const params = ['all', 'active', 'completed'];
	if (params.every((param) => param !== to.params.filter)) {
		return '/all';
	}
});

export default router;
