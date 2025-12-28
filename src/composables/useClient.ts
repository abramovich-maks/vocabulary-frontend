import axios from "axios";
import {authStore} from "../composables/authStore";

export const apiClient = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

apiClient.interceptors.request.use(config => {
    const token = authStore.getAccessToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

apiClient.interceptors.response.use(
    res => res,
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes("/token/refresh")
        ) {
            originalRequest._retry = true;

            try {
                const refreshRes = await apiClient.post("/token/refresh");
                const newToken = refreshRes.data.token;

                authStore.setAccessToken(newToken);
                originalRequest.headers.Authorization = `Bearer ${newToken}`;

                return apiClient.request(originalRequest);
            } catch {
                authStore.clear();
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);
