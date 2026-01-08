import {apiClient} from "../composables/useClient";

import type {AnswerResultDto, DailyTestShowResponseDto,DailyTestResponseDto} from "../models/models";


export const getDailyTest = () => {
    return apiClient.get<DailyTestShowResponseDto>("/dailytest");
};

export const answerQuestion = (questionId: number, userAnswer: string) => {
    return apiClient.post<AnswerResultDto>(`/dailytest/questions/${questionId}/answer`,
        {userAnswer}
    );
};

export const getResult = () => {
    return apiClient.post<DailyTestResponseDto>("/dailytest/result");
};