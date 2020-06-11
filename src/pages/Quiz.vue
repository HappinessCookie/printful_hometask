<template>
	<div class="quiz">
		<div v-if="currentQuestion" class="quiz__question">
			<Question v-model="answer" :quizId="id" :id="currentQuestion.id"></Question>
		</div>
		<div class="quiz__progress">
			<v-progress-linear
				class="mt-4"
				color="light-blue"
				height="10"
				striped
				:value="progress"
			></v-progress-linear>
		</div>
		<div class="quiz__action">
			<v-btn class="mt-4" @click="next">Next</v-btn>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from 'vuex';
	import Question from '~/components/Question';

	export default {
		name: 'Quiz',
		components: {
			Question,
		},
		props: {
			id: {
				type: [String, Number],
				required: true,
			},
		},

		data() {
			return {
				answer: null,
				questionIndex: 0,
			};
		},

		computed: {
			...mapGetters('questions', {
				questionsList: 'list',
			}),
			currentQuestion() {
				return this.questionsList[this.questionIndex];
			},
			progress() {
				return Math.min(this.questionIndex * 100 / this.questionsList.length, 100);
			},
		},

		created() {
			this.questionsLoad({ quizId: this.$route.params.id });
		},

		mounted() {
			this.resetAnswers();
		},

		watch: {
			questionIndex() {
				if (this.questionIndex >= this.questionsList.length) {
					this.$router.push({ name: 'result' });
				}
			},
		},

		methods: {
			...mapActions('user', {
				addAnswer: 'addAnswer',
				resetAnswers: 'resetAnswers',
			}),
			...mapActions('questions', {
				questionsLoad: 'load',
			}),
			next() {
				if (!this.answer) {
					return false;
				}
				this.addAnswer(this.answer);
				this.answer = null;
				this.questionIndex += 1;
			},
		},
	};
</script>

<style scoped lang="scss">
	.quiz {
		&__progress {
			display: grid;
			grid-template-columns: 60%;
			justify-content: center;
		}

		&__action {
			display: flex;
			justify-content: center;
		}
	}
</style>
