import {apiClient} from "../api/useApi";

export interface LoginRequest {
    email: string;
    password: string;
}

export const login = (data: LoginRequest) => {
    return apiClient.post("/token", data);
};

export const checkAuth = () => {
    return apiClient.get<{ loggedIn: boolean }>("/status");
};

export const logout = () => {
    return apiClient.post("/logout");
};