import { apiClient } from "../api/useApi";
import type { GetAllWordsResponse, WordDto } from "./dictionaryTypes";

export interface AddWordRequest {
    word: string;
    translate: string;
}

export const getAllWords = () => {
    return apiClient.get<GetAllWordsResponse>("/words");
};

export const addWord = (data: AddWordRequest) => {
    return apiClient.post<WordDto>("/words", data);
};
