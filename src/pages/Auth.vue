<template>
	<div class="auth">
		<h1 class="mb-4">Technical task</h1>
		<v-form ref="form">
			<v-text-field
				v-model="name"
				label="Name"
				placeholder="Enter your name"
				required
				outlined
				:rules="[v => !!v || 'Name is required']"
			></v-text-field>
			<v-select
				v-model="quiz"
				label="Test"
				placeholder="Choose quiz"
				required
				outlined
				:items="testsList"
				:rules="[v => !!v || 'Quiz is required']"
			></v-select>
			<div class="auth__action">
				<v-btn class="mr-4" @click="submit">Start</v-btn>
			</div>
		</v-form>
	</div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    name: 'Auth',

    data() {
      return {
        name: '',
        quiz: '',
      };
    },

    computed: {
      ...mapGetters('quizzes', {
        quizzesList: 'list',
      }),
      testsList() {
        return this.quizzesList.map(quiz => {
          return {
            text: quiz.title,
            value: quiz.id,
          };
        });
      },
    },

    created() {
      this.quizzesLoad();
    },

    methods: {
      ...mapActions('user', {
				setName: 'setName',
				setActiveQuiz: 'setActiveQuiz',
      }),
      ...mapActions('quizzes', {
        quizzesLoad: 'load',
      }),
      submit() {
        if (!this.$refs.form.validate()) {
          return false;
        }
        this.setName(this.name);
        this.setActiveQuiz(this.quiz);
        this.$router.push({
          name: 'quiz',
          params: { id: this.quiz },
        });
      },
    },
  };
</script>

<style scoped lang="scss">
	.auth {
		display: grid;
		justify-content: center;
		justify-items: center;

		&__action {
			display: flex;
			justify-content: center;
		}
	}
</style>
