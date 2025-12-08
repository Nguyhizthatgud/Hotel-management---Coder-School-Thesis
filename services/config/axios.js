import axios from "axios";
import authService from "../authServices.ts";

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
// responze interceptor - handle errors 
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized - token expired
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                //tryna refresh token
                const newToken = await authService.refreshIdToken(true); // force refresh
                if (newToken) {
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest); // retry original request    
                }
            } catch (refreshError) {
                // refresh failed, turn back login
                if (typeof window !== 'undefined') {
                    console.log('[axios] Using backend baseURL:', baseURL);
                }
                return Promise.reject(refreshError);
            }
        }

    }
);

export default axiosInstance;