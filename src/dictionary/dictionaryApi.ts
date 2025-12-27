import { apiClient } from "../api/useApi";
import type { GetAllWordsResponse } from "./dictionaryTypes";

export const getAllWords = () => {
    return apiClient.get<GetAllWordsResponse>("/words");
};
