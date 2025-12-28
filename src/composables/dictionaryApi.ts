import {apiClient} from "../composables/useClient";

import type {
    GetAllWordsResponse,
    WordDto,
    UpdateWordRequest,
    AddWordRequest
} from '../models/models';

export const getAllWords = () => {
    return apiClient.get<GetAllWordsResponse>("/words");
};

export const addWord = (data: AddWordRequest) => {
    return apiClient.post<WordDto>("/words", data);
};

export const deleteWord = (id: number) => {
    return apiClient.delete(`/words/${id}`);
};

export const updateWord = (id: number, data: UpdateWordRequest) => {
    return apiClient.patch(`/words/${id}`, data);
};

export const getDetailsWord = (id: number) => {
    return apiClient.get<WordDto>(`/words/${id}`);
};