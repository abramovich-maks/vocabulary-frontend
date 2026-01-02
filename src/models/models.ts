export interface WordDto {
    id: number;
    word: string;
    translate: string;
}

export interface GetAllWordsResponse {
    dtoResponse: WordDto[];
}

export interface UpdateWordRequest {
    word?: string;
    translate?: string;
}

export interface AddWordRequest {
    word: string;
    translate: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    surname: string;
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
    answer: string;
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
    userAnswer: string;
    correctAnswer: string;
    correct: boolean;
}

export interface DailyTestControllerResponseDto {
    userId: number;
    total: number;
    correct: number;
    incorrect: number;
    answers: AnswerResultDto[];
}

export interface ThemeType {
    background: string;
    logo: string;
    textPrimary: string;
    textSecondary: string;
    textHighlited: string;
    button: string;
    buttonText: string;
    buttonHover: string;
    card: string;
    positive: string;
    negative: string;
}
