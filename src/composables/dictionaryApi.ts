import {apiClient} from "../composables/useClient";

import type {
    WordDto,
    UpdateWordRequest,
    AddWordRequest,
    WordDetails,
    PageResponse
} from '../models/models';

export const getAllWords = (page = 0, size = 10) => {
    return apiClient.get<PageResponse<WordDto>>("/words", {
        params: {page, size}
    });
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
    return apiClient.get<WordDetails>(`/words/${id}/details`);
};