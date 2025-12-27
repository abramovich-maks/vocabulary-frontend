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