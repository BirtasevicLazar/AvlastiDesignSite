import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axios';

export const useAuth = () => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = localStorage.getItem('admin-token');
                if (!token) {
                    setLoading(false);
                    return;
                }

                const response = await axiosInstance.get('/api/admin/me');
                setAdmin(response.data.admin);
            } catch (error) {
                console.error('Auth check error:', error);
                localStorage.removeItem('admin-token');
                localStorage.removeItem('admin-data');
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axiosInstance.post('/api/admin/login', {
                email,
                password
            });
            
            localStorage.setItem('admin-token', response.data.token);
            localStorage.setItem('admin-data', JSON.stringify(response.data.admin));
            setAdmin(response.data.admin);
            navigate('/admin/dashboard');
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Greška prilikom prijave'
            };
        }
    };

    const logout = async () => {
        try {
            await axiosInstance.post('/api/admin/logout');
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('admin-token');
            localStorage.removeItem('admin-data');
            setAdmin(null);
            navigate('/admin/login');
        }
    };

    return {
        admin,
        loading,
        login,
        logout,
        isAuthenticated: !!admin
    };
}; 