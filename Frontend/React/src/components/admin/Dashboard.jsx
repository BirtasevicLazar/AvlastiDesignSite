import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';
import { ShoppingBagIcon, PhotoIcon, StarIcon } from '@heroicons/react/24/outline';
import ProductManager from './ProductManager';
import PopularProductsManager from './PopularProductsManager';
import OrderManager from './OrderManager';

const AdminDashboard = () => {
    const { admin, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('orders');

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            {/* Top Navigation - Only for Mobile */}
            <header className="md:hidden bg-white fixed top-0 left-0 right-0 z-50 px-4 py-3 border-b border-gray-100">
                <div className="flex justify-between items-center">
                    <img src={logo} alt="AvlastiDesign Logo" className="h-8 w-auto" />
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={logout}
                        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                        title="Odjavi se"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </motion.button>
                </div>
            </header>

            {/* Desktop Side Navigation */}
            <nav className="hidden md:block fixed left-0 top-0 h-screen w-16 bg-white border-r border-gray-100">
                <div className="h-full flex flex-col items-center py-6">
                    <img src={logo} alt="AvlastiDesign Logo" className="w-10 mb-8" />
                    
                    <div className="flex-1 flex flex-col items-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTabChange('orders')}
                            className={`p-3 rounded-xl transition-all duration-200 group ${
                                activeTab === 'orders' 
                                    ? 'bg-[#C72C41] text-white' 
                                    : 'text-gray-400 hover:text-[#C72C41]'
                            }`}
                            title="Porudžbine"
                        >
                            <ShoppingBagIcon className="h-6 w-6" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTabChange('products')}
                            className={`p-3 rounded-xl transition-all duration-200 group ${
                                activeTab === 'products' 
                                    ? 'bg-[#C72C41] text-white' 
                                    : 'text-gray-400 hover:text-[#C72C41]'
                            }`}
                            title="Proizvodi"
                        >
                            <PhotoIcon className="h-6 w-6" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleTabChange('popular')}
                            className={`p-3 rounded-xl transition-all duration-200 group ${
                                activeTab === 'popular' 
                                    ? 'bg-[#C72C41] text-white' 
                                    : 'text-gray-400 hover:text-[#C72C41]'
                            }`}
                            title="Popularni Proizvodi"
                        >
                            <StarIcon className="h-6 w-6" />
                        </motion.button>
                    </div>

                    <div className="mt-auto">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={logout}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                            title="Odjavi se"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </motion.button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-16 md:pt-0 md:pl-16 pb-20 md:pb-4">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
                    >
                        {activeTab === 'orders' ? (
                            <OrderManager />
                        ) : activeTab === 'products' ? (
                            <ProductManager />
                        ) : (
                            <PopularProductsManager />
                        )}
                    </motion.div>
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100">
                <div className="flex justify-around items-center py-2">
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTabChange('orders')}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                            activeTab === 'orders' 
                                ? 'bg-[#C72C41] text-white' 
                                : 'text-gray-400 hover:text-[#C72C41]'
                        }`}
                    >
                        <ShoppingBagIcon className="h-6 w-6" />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTabChange('products')}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                            activeTab === 'products' 
                                ? 'bg-[#C72C41] text-white' 
                                : 'text-gray-400 hover:text-[#C72C41]'
                        }`}
                    >
                        <PhotoIcon className="h-6 w-6" />
                    </motion.button>

                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleTabChange('popular')}
                        className={`p-3 rounded-xl transition-all duration-200 ${
                            activeTab === 'popular' 
                                ? 'bg-[#C72C41] text-white' 
                                : 'text-gray-400 hover:text-[#C72C41]'
                        }`}
                    >
                        <StarIcon className="h-6 w-6" />
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard; 