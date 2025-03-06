import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000/api/v1/',
    withCredentials: true,
});

// Add Request and Response interceptor if required