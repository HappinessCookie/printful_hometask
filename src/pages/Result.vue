<template>
	<div class="text-center">
		<h1 class="mb-8">Thanks, {{ name }}!</h1>
		<v-skeleton-loader
			:loading="!loaded"
			type="text"
		>
			<p>You responded correctly to {{ correct }} out of {{ total }} questions.</p>
		</v-skeleton-loader>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'Auth',

		data() {
			return {
				loaded: false,
				correct: '',
				total: '',
			};
		},

		computed: {
			...mapGetters('user', {
				name: 'name',
				activeQuizId: 'activeQuizId',
				answers: 'answers',
			}),
		},

		mounted() {
			this.loadResult();
		},

		methods: {
			...mapActions('answers', {
				checkAnswers: 'checkAnswers',
			}),

			async loadResult() {
				const { correct, total } = await this.checkAnswers({
					quizId: this.activeQuizId,
					answersId: this.answers,
				});
				this.correct = correct;
				this.total = total;
				this.loaded = true;
			},
		},
	};
</script>

<style scoped>

</style>
