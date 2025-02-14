import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://192.168.0.21:8000',
    withCredentials: true
});

// Interceptor za dodavanje tokena u svaki zahtev
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Interceptor za obradu grešaka
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('admin-token');
            localStorage.removeItem('admin-data');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance; 