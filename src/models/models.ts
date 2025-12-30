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