<template>
	<div>
		<v-skeleton-loader
			:loading="!loaded"
			height="48"
			type="heading"
		>
			<h1>Question {{ question.title }}</h1>
		</v-skeleton-loader>

		<v-row align="center" justify="center">
			<v-col v-for="answer in answersList" cols="6">
				<v-row align="center" justify="center">
					<v-col cols="8">
						<v-skeleton-loader :loading="!loaded" type="button">
							<v-btn
								block
								:color="answer.id === value ? 'primary' : ''"
								@click="$emit('input', answer.id)"
							>
								{{ answer.title }}
							</v-btn>
						</v-skeleton-loader>
					</v-col>
				</v-row>
			</v-col>
		</v-row>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';

	export default {
		name: 'Question',

		props: {
			id: {
				type: [String, Number],
				required: true,
			},
			quizId: {
				type: [String, Number],
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
				if (!this.loaded) {
					return 4;
				}
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

<style scoped>

</style>
