<template>
	<v-app>
		<v-content>
			<v-container class="fill-height" fluid>
				<div class="app">
					<router-view></router-view>
				</div>
			</v-container>
		</v-content>
	</v-app>
</template>

<script>
	export default {
		name: 'App',
	};
</script>

<style scoped lang="scss">
	.app {
		margin: auto;
		max-width: 800px;
		width: 100%;
	}
</style>
