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
                <div v-for="answer in answersList" class="answers__item">
                    <v-btn
                        block
                        :color="answer.id === value ? 'primary' : ''"
                        @click="$emit('input', answer.id)"
                    >
                        {{ answer.title }}
                    </v-btn>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: "Question",

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
        ...mapGetters("questions", {
            getQuestionById: "getQuestionById",
        }),
        ...mapGetters("answers", {
            getQuestionAnswersById: "getQuestionAnswersById",
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
        ...mapActions("answers", {
            answersLoad: "load",
        }),
    },
};
</script>

<style scoped lang="scss">
    .answers {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        justify-content: space-between;
        grid-gap: 20px;
    }
</style>
