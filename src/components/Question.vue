<template>
	<div>
		<v-skeleton-loader
			:loading="!loaded"
			height="48"
			type="heading"
		>
			<h1 class="text-center">{{ question.title }}</h1>
		</v-skeleton-loader>

		<div class="answers mt-4">
			<template v-if="!loaded">
				<v-skeleton-loader
					v-for="i in 4"
					:loading="!loaded"
					type="button"
				/>
			</template>

			<template v-else>
				<v-btn
					v-for="answer in answersList"
					block
					:color="answer.id === value ? 'primary' : ''"
					@click="$emit('input', answer.id)"
				>
					{{ answer.title }}
				</v-btn>
			</template>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'Question',

		props: {
			id: {
				type: [ String, Number ],
				required: true,
			},
			quizId: {
				type: [ String, Number ],
				required: true,
			},
			value: {
				type: Number,
				required: false,
			},
		},

		data() {
			return {
				loaded: false,
			};
		},

		computed: {
			...mapGetters('questions', {
				getQuestionById: 'getQuestionById',
			}),
			...mapGetters('answers', {
				getQuestionAnswersById: 'getQuestionAnswersById',
			}),

			question() {
				return this.getQuestionById(this.id);
			},

			answersList() {
				return this.getQuestionAnswersById(this.id);
			},
		},

		watch: {
			id: {
				handler: async function () {
					this.loaded = false;
					await this.answersLoad({
						quizId: this.quizId,
						questionId: this.id,
					});
					this.loaded = true;
				},
				immediate: true,
			},
		},

		methods: {
			...mapActions('answers', {
				answersLoad: 'load',
			}),
		},
	};
</script>

<style scoped lang="scss">
	.answers {
		display: grid;
		grid-template-columns: repeat(2, minmax(min-content, 30%));
		justify-content: space-around;
		justify-items: center;
		grid-gap: 20px;

		@media (max-width: 800px) {
			grid-template-columns: minmax(max-content, 80%);
		}
	}
</style>
