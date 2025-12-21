import axios from "axios";
import authService from "../authServices.ts";
import { useAuthStore } from "../../stores/useAuthStore.ts";

const baseURL = process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:4001/api"
    : process.env.NEXT_PUBLIC_API_URL || "https://your-production-api-url.com/api";

// create axios instance
const axiosInstance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// request interceptor - add auth token
axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            // Get Firebase ID token
            const token = await authService.getIdToken();

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error getting auth token:", error);
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// response interceptor - handle errors (auto logout on expired token)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config || {};

        // Handle 401 Unauthorized - try refresh once
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const newToken = await authService.refreshIdToken(true); // force refresh
                if (newToken) {
                    originalRequest.headers = originalRequest.headers || {};
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest); // retry with new token
                }
            } finally {
                // if refresh fails, will proceed to logout below
            }
        }

        // If refresh failed or still 401, logout
        if (error.response?.status === 401) {
            try {
                // call Zustand logout to clear both persisted state and Firebase auth
                await useAuthStore.getState().logout();
            } catch (e) {
                console.error("Logout after token failure failed", e);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;