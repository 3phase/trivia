import { TriviaQuestion } from "./trivia-response.type";

export type TriviaAnswer = {
    id: number;
    answer: string;
    correct: boolean;
}

export type TriviaQuestionWithMeta = TriviaQuestion & {
    answers: TriviaAnswer[],
    answered: boolean;
}