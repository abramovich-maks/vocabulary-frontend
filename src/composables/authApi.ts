import {apiClient} from "../composables/useClient";

import type {LoginRequest, RegisterRequest} from '../models/models';

export const login = (data: LoginRequest) => {
    return apiClient.post("/token", data);
};

export const logout = () => {
    return apiClient.post("/logout");
};

export const register = (data: RegisterRequest) => {
    return apiClient.post("/register", data);
};