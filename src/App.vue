<template>
	<main class="container px-2">
		<router-view></router-view>
	</main>
	<the-footer></the-footer>
</template>

<script>
import TheFooter from './components/TheFooter.vue';

export default {
	name: 'App',
	components: {
		TheFooter,
	},
};
</script>

<style>
.container {
	max-width: 480px;
}
</style>
