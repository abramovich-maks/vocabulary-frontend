import {apiClient} from "../composables/useClient";

import type {
    AddWordAutoTranslate,
    AddWordRequest,
    CreateGroupRequest,
    CreateGroupResponse,
    DeleteGroupResponse,
    PageResponse,
    UpdateGroupRequest,
    UpdateGroupResponse,
    UpdateWordRequest,
    WordDetails,
    WordDto,
    WordsGroupResponse,
    WordsResponse,
    DeleteWordFromGroupDtoResponse,
    AllGroupsResponse
} from '../models/models';

export const getAllWords = () => {
    return apiClient.get<WordsResponse>("/words");
};

export const addWord = (data: AddWordRequest) => {
    return apiClient.post<WordDto>("/words", data);
};

export const addWordAutoTranslate = (data: AddWordAutoTranslate) => {
    return apiClient.post<WordDto>("/words/auto", data);
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

export const createGroups = (data: CreateGroupRequest) => {
    return apiClient.post<CreateGroupResponse>("/groups", data);
};

export const getAllGroups = () => {
    return apiClient.get<AllGroupsResponse>("/groups");
};

export const deleteGroup = (groupId: number) => {
    return apiClient.delete<DeleteGroupResponse>(`/groups/${groupId}`);
};

export const updateGroup = (groupId: number, data: UpdateGroupRequest) => {
    return apiClient.put<UpdateGroupResponse>(`/groups/${groupId}`, data);
};

export const getGroupById = (groupId: number) => {
    return apiClient.get<WordsGroupResponse>(`/groups/${groupId}`);
};

export const addWordsToGroup = (groupId: number, wordIds: number[]) => {
    return apiClient.post(`/groups/${groupId}/add/words`, {wordIds});
};

export const getAvailableWords = (groupId: number) => {
    return apiClient.get<WordsResponse>(`/words/${groupId}/available`);
};

export const addWordToGroup = (groupId: number, wordId: number) => {
    return apiClient.post(`/words/groups/${groupId}/words/${wordId}`);
};

export const deleteWordFromGroup = (groupId: number, wordId: number) => {
    return apiClient.delete<DeleteWordFromGroupDtoResponse>(`/groups/${groupId}/word/${wordId}`);
};