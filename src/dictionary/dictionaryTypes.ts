export interface WordDto {
    id: number;
    word: string;
    translate: string;
}

export interface GetAllWordsResponse {
    dtoResponse: WordDto[];
}
