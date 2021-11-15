<template>
	<h1 class="text-primary mt-5 mb-4">Todos</h1>
	<input
		type="text"
		class="form-control form-control-lg mb-3"
		autocomplete="off"
		placeholder="what needs to be done?"
		autofocus
		@keyup.enter="addTodo"
	/>
	<ul class="list-group mb-3">
		<li
			class="list-group-item d-flex justify-content-between align-items-center"
		>
			<div>
				<input
					type="checkbox"
					class="form-check-input me-3"
					:checked="allChecked"
					@change="toggleAllTodo(!allChecked)"
				/>
				<span class="text-secondary px-1"
					>{{ remaining }} {{ pluralize(remaining, 'item') }} left</span
				>
			</div>
			<nav class="nav">
				<ul class="nav">
					<li class="nav-item" v-for="(val, key) in filters" :key="key">
						<a
							:href="'#/' + key"
							class="nav-link px-2 py-1"
							:class="{ 'link-secondary': visibility !== key }"
							@click="visibility = key"
							>{{ capitalize(key) }}</a
						>
					</li>
				</ul>
			</nav>
		</li>
		<todo-list
			v-for="todo in filteredTodos"
			:key="todo.id"
			:todo="todo"
		></todo-list>
	</ul>
	<button
		type="button"
		class="btn btn-primary w-100"
		@click="clearCompleted"
		v-if="todos.length > remaining"
	>
		Clear Completed
	</button>
</template>

<script>
import { mapActions } from 'vuex';
import TodoList from './TodoList.vue';

const filters = {
	all: (todos) => todos,
	active: (todos) => todos.filter((todo) => !todo.completed),
	completed: (todos) => todos.filter((todo) => todo.completed),
};

export default {
	name: 'Home',
	props: {
		filter: String,
	},
	components: {
		TodoList,
	},
	data() {
		return {
			visibility: this.filter,
			filters: filters,
		};
	},

	computed: {
		todos() {
			return this.$store.state.todos;
		},
		filteredTodos() {
			return this.filters[this.visibility](this.todos);
		},

		allChecked() {
			return this.todos.every((todo) => todo.completed);
		},
		remaining() {
			return this.todos.filter((todo) => !todo.completed).length;
		},
	},
	methods: {
		...mapActions(['addTodo', 'toggleAllTodo', 'clearCompleted']),

		addTodo(e) {
			const title = e.target.value.trim();
			if (title.length) {
				this.$store.dispatch('addTodo', title);
				e.target.value = '';
			}
		},
		pluralize(count, word) {
			return count === 1 ? word : word + 's';
		},
		capitalize(word) {
			return word.charAt(0).toUpperCase() + word.slice(1);
		},
	},
};
</script>

<style scoped></style>
