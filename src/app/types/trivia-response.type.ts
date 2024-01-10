export type TriviaResponse = {
    response_code: number;
};

export type TriviaResponseToken = TriviaResponse & {
    token?: string;
    response_message: string;
}

export type TriviaResponseQuestions = TriviaResponse & {
    results?: TriviaQuestion[];
}

export type TriviaQuestion = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}