export interface WordDto {
    id: number;
    word: string;
    translate: string;
}

export interface PageResponse<T> {
    content: T[];
    number: number;
    size: number;
    totalPages: number;
    totalElements: number;
}

export interface UpdateWordRequest {
    word?: string;
    translate?: string;
}

export interface AddWordRequest {
    word: string;
    translate: string;
}

export interface AddWordAutoTranslate {
    word: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    surname: string;
    language: string;
    email: string;
    password: string;
}

export interface WordDetails {
    word: string;
    phonetic: string;
    audioUrl: string;
    definition: string;
    example: string;
}

export interface QuestionDto {
    id: number;
    wordEntryId: number;
    prompt: string;
    direction: "WORD_TO_TRANSLATION" | "TRANSLATION_TO_WORD";
}

export interface AnswerQuestionRequestDto {
    questionId: number
    userAnswer: string
}

export interface DailyTestShowResponseDto {
    id: number;
    taskDate: string;
    userId: number;
    questions: QuestionDto[];
}

export interface UserAnswerRequestDto {
    questionId: number;
    answer: string;
}

export interface AnswerResultDto {
    questionId: number;
    wordEntryId: number;
    word: string;
    userAnswer: string;
    correctAnswer: string;
    correct: boolean;
}

export interface DailyTestResponseDto {
    userId: number;
    total: number;
    correct: number;
    incorrect: number;
    answers: AnswerResultDto[];
}