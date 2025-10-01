// src/api/axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000',
    withCredentials: true, // Tự động gửi cookies
    headers: {
        'Content-Type': 'application/json',
    },
});

// Nếu cần interceptor để check lỗi 401
axiosClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn('Unauthorized, please login again!');
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
