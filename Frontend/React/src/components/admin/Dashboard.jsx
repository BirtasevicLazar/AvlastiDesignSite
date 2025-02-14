import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import ProductManager from './ProductManager';
import PopularProductsManager from './PopularProductsManager';
import HeroManager from './HeroManager';

const AdminDashboard = () => {
    const { admin, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('hero');

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/">
                                <img src={logo} alt="AvlastiDesign Logo" className="h-8 w-auto" />
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-700">
                                {admin?.name}
                            </span>
                            <button
                                onClick={logout}
                                className="flex items-center px-3 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                            >
                                <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-2" />
                                Odjavi se
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        <button
                            onClick={() => setActiveTab('hero')}
                            className={`${
                                activeTab === 'hero'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Hero Sekcija
                        </button>
                        <button
                            onClick={() => setActiveTab('products')}
                            className={`${
                                activeTab === 'products'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Proizvodi
                        </button>
                        <button
                            onClick={() => setActiveTab('popular')}
                            className={`${
                                activeTab === 'popular'
                                    ? 'border-indigo-500 text-indigo-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                        >
                            Popularni Proizvodi
                        </button>
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {activeTab === 'hero' ? (
                    <HeroManager />
                ) : activeTab === 'products' ? (
                    <ProductManager />
                ) : (
                    <PopularProductsManager />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard; 