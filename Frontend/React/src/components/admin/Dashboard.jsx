import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';
import {
    HomeIcon,
    UsersIcon,
    ShoppingBagIcon,
    CogIcon,
    ChartBarIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';

const navigation = [
    { name: 'Dashboard', icon: HomeIcon, href: '/admin/dashboard' },
    { name: 'Proizvodi', icon: ShoppingBagIcon, href: '/admin/products' },
    { name: 'Korisnici', icon: UsersIcon, href: '/admin/users' },
    { name: 'Statistika', icon: ChartBarIcon, href: '/admin/analytics' },
    { name: 'Podešavanja', icon: CogIcon, href: '/admin/settings' },
];

const AdminDashboard = () => {
    const { admin, loading, logout } = useAuth();
    const location = useLocation();
    const [currentPath] = useState(location.pathname);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex items-center space-x-3">
                    <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xl text-gray-600">Učitavanje...</span>
                </div>
            </div>
        );
    }

    if (!admin) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="flex items-center justify-center h-20 border-b border-gray-100">
                        <Link to="/">
                            <img src={logo} alt="AvlastiDesign Logo" className="h-8 w-auto" />
                        </Link>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4 py-6 space-y-1">
                        {navigation.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                        currentPath === item.href
                                            ? 'bg-indigo-50 text-indigo-600'
                                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                                >
                                    <Icon className="h-5 w-5 mr-3" />
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Profile & Logout */}
                    <div className="p-4 border-t border-gray-100">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                                <span className="text-indigo-600 font-medium text-lg">
                                    {admin.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                                <p className="text-xs text-gray-500">{admin.email}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                            Odjavi se
                        </button>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="ml-64">
                <main className="p-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold text-gray-900">Dobrodošli, {admin.name}!</h1>
                            <p className="text-gray-600 mt-1">Upravljajte svojim sadržajem i pratite statistiku</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Statistika kartice */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Ukupno proizvoda</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">24</p>
                                    </div>
                                    <div className="h-12 w-12 bg-indigo-50 rounded-lg flex items-center justify-center">
                                        <ShoppingBagIcon className="h-6 w-6 text-indigo-600" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Ukupno korisnika</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">156</p>
                                    </div>
                                    <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center">
                                        <UsersIcon className="h-6 w-6 text-green-600" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Mesečna prodaja</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">€2,450</p>
                                    </div>
                                    <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
                                        <ChartBarIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="bg-white rounded-xl shadow-sm p-6"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">Aktivne porudžbine</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">8</p>
                                    </div>
                                    <div className="h-12 w-12 bg-yellow-50 rounded-lg flex items-center justify-center">
                                        <CogIcon className="h-6 w-6 text-yellow-600" />
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Nedavne aktivnosti */}
                        <div className="mt-8">
                            <h2 className="text-lg font-bold text-gray-900 mb-4">Nedavne aktivnosti</h2>
                            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                                <div className="divide-y divide-gray-100">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <div key={item} className="p-4 hover:bg-gray-50 transition-colors">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                                                        <ShoppingBagIcon className="h-4 w-4 text-indigo-600" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900">Nova porudžbina #{item}</p>
                                                        <p className="text-xs text-gray-500">Pre 2 sata</p>
                                                    </div>
                                                </div>
                                                <span className="text-sm text-gray-600">€149.99</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard; 