import {apiClient} from "../composables/useClient";

import type {
    DailyTestShowResponseDto,
    DailyTestControllerResponseDto,
    UserAnswerRequestDto
} from '../models/models';


export const getDailyTest = () => {
    return apiClient.get<DailyTestShowResponseDto>("/dailytest");
};

export const submitDailyTest = (answers: UserAnswerRequestDto[]) => {
    return apiClient.post<DailyTestControllerResponseDto>("/dailytest", {
        answers,
    });
};