import { createStore } from 'vuex';

const STORAGE_KEY = 'vue-todo-app';

const defaultTodo = [
	{
		id: '1',
		title: 'Learn Javascript.',
		completed: true,
	},
	{
		id: '2',
		title: 'Learn Vue 3',
		completed: true,
	},
	{
		id: '3',
		title: 'Learn Bootstrap 5.',
		completed: false,
	},
	{
		id: '4',
		title: 'Build Awesome things.',
		completed: false,
	},
];

const state = {
	todos: JSON.parse(window.localStorage.getItem(STORAGE_KEY)) || defaultTodo,
};

const mutations = {
	addTodo(state, payload) {
		state.todos.push(payload);
	},

	removeTodo(state, payload) {
		state.todos.splice(state.todos.indexOf(payload), 1);
	},
	editTodo(state, { todo, title = todo.title, completed = todo.completed }) {
		const index = state.todos.indexOf(todo);

		state.todos.splice(index, 1, {
			...todo,
			title,
			completed,
		});
	},
};

const actions = {
	addTodo(context, text) {
		context.commit('addTodo', {
			id: Date.now(),
			title: text,
			completed: false,
		});
	},

	editTodo({ commit }, { todo, value }) {
		commit('editTodo', { todo, title: value });
	},

	toggleTodo({ commit }, payload) {
		commit('editTodo', {
			todo: payload,
			completed: !payload.completed,
		});
	},

	toggleAllTodo({ state, commit }, completed) {
		state.todos.forEach((todo) => {
			commit('editTodo', { todo, completed });
		});
	},

	clearCompleted({ state, commit }) {
		state.todos
			.filter((todo) => todo.completed)
			.forEach((todo) => {
				commit('removeTodo', todo);
			});
	},
	removeTodo({ commit }, payload) {
		commit('removeTodo', payload);
	},
};

const plugins = [
	(store) => {
		store.subscribe((_1, { todos }) => {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		});
	},
];

export default createStore({
	state,
	mutations,
	actions,
	plugins,
});
