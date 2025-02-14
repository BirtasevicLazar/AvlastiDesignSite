import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://192.168.0.21:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    withCredentials: true
});

// Dodaj token u svaki zahtev
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('admin-token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Hendluj greške
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('admin-token');
            localStorage.removeItem('admin-user');
            window.location.href = '/control-panel-secure-x9j2m5';
        }
        return Promise.reject(error);
    }
);

export default instance; 