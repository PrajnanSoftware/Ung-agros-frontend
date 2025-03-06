import axios from "axios";

const _apiClient = axios.create({
    baseURL: 'http://localhost:8080/api/',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true
});

_apiClient.interceptors.request.use(
    (config) => {
        // const token = store.getSta
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

_apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("API Error: ", error.response.data);
            if (error.response.status === 401) {
                // remove token and redirect to login or home
            }
        }
        return Promise.reject(error);
    }
);

export default _apiClient;