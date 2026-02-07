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
    phonetic: string;
    audioUrl: string;
    example: string;
    alternativeTranslate: string[]
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

export interface CreateGroupResponse {
    groupId: number,
    groupName: string,
    message: string
}

export interface CreateGroupRequest {
    groupName: string
}

export interface GroupDto {
    groupId: number;
    groupName: string;
}

export interface GroupResponse {
    groupId: number;
    groupName: string;
    countWord: number
}

export interface AllGroupsResponse {
    groups: GroupResponse[];
}

export interface DeleteGroupResponse {
    groupId: number,
    groupName: string,
    message: string
}

export interface UpdateGroupRequest {
    newGroupName: string
}
export interface UpdateGroupResponse {
    groupId: number,
    groupName: string
}
export interface WordsGroupResponse {
    userId: number;
    groupName: string;
    words: WordDto[];
}

export interface WordsResponse {
    words: WordDto[];
}

export interface DeleteWordFromGroupDtoResponse {
    message: string
}
