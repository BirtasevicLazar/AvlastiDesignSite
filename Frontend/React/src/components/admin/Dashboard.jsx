import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import logo from '../../assets/images/logo.png';
import { 
    ArrowLeftOnRectangleIcon,
    Bars3Icon,
    XMarkIcon,
    ShoppingBagIcon,
    PhotoIcon,
    StarIcon,
    HomeIcon
} from '@heroicons/react/24/outline';
import ProductManager from './ProductManager';
import PopularProductsManager from './PopularProductsManager';
import OrderManager from './OrderManager';

const tabs = [
    { id: 'orders', name: 'Porudžbine', icon: ShoppingBagIcon },
    { id: 'products', name: 'Proizvodi', icon: PhotoIcon },
    { id: 'popular', name: 'Popularni Proizvodi', icon: StarIcon },
];

const AdminDashboard = () => {
    const { admin, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('orders');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm fixed w-full top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <Link to="/" className="flex-shrink-0">
                                <img src={logo} alt="AvlastiDesign Logo" className="h-8 w-auto" />
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => handleTabChange(tab.id)}
                                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                                        activeTab === tab.id
                                            ? 'text-indigo-600 bg-indigo-50'
                                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                    }`}
                                >
                                    <tab.icon className="h-5 w-5 mr-2" />
                                    {tab.name}
                                </button>
                            ))}
                            <div className="h-6 w-px bg-gray-200"></div>
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

                        {/* Mobile menu button */}
                        <div className="md:hidden flex items-center">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50 focus:outline-none"
                            >
                                {isMobileMenuOpen ? (
                                    <XMarkIcon className="h-6 w-6" />
                                ) : (
                                    <Bars3Icon className="h-6 w-6" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="fixed top-16 right-0 bottom-0 w-64 bg-white shadow-xl z-50 md:hidden"
                        >
                            <div className="px-4 py-6 space-y-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                                            activeTab === tab.id
                                                ? 'text-indigo-600 bg-indigo-50'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        <tab.icon className="h-5 w-5 mr-3" />
                                        {tab.name}
                                    </button>
                                ))}
                                <div className="border-t border-gray-200 my-4"></div>
                                <div className="px-4">
                                    <span className="text-sm text-gray-700 block mb-4">
                                        {admin?.name}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                    >
                                        <ArrowLeftOnRectangleIcon className="h-5 w-5 mr-3" />
                                        Odjavi se
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Main content */}
            <main className="pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
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
        </div>
    );
};

export default AdminDashboard; 