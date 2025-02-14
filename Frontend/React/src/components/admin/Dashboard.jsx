import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import axiosInstance from '../../utils/axios';
import logo from '../../assets/images/logo.png';
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import ProductManager from './ProductManager';

const AdminDashboard = () => {
    const { admin, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('hero');
    const [loading, setLoading] = useState(false);
    const [heroSettings, setHeroSettings] = useState({
        bestseller_title: '',
        bestseller_price: '',
        bestseller_image: null
    });
    const [previewImage, setPreviewImage] = useState(null);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        const fetchHeroSettings = async () => {
            try {
                const response = await axiosInstance.get('/api/admin/hero-settings');
                if (response.data) {
                    setHeroSettings({
                        bestseller_title: response.data.bestseller_title || '',
                        bestseller_price: response.data.bestseller_price || '',
                        bestseller_image: response.data.bestseller_image || null
                    });
                    if (response.data.bestseller_image) {
                        setPreviewImage(response.data.bestseller_image);
                    }
                }
            } catch (error) {
                console.error('Error fetching hero settings:', error);
                setMessage({ type: 'error', text: 'Greška pri učitavanju podešavanja' });
            }
        };

        fetchHeroSettings();
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setHeroSettings(prev => ({ ...prev, bestseller_image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const formData = new FormData();
            formData.append('bestseller_title', heroSettings.bestseller_title);
            formData.append('bestseller_price', heroSettings.bestseller_price);
            if (heroSettings.bestseller_image instanceof File) {
                formData.append('bestseller_image', heroSettings.bestseller_image);
            }

            const response = await axiosInstance.post('/api/admin/hero-settings', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage({ type: 'success', text: 'Podešavanja su uspešno sačuvana' });
            if (response.data.settings.bestseller_image) {
                setPreviewImage(response.data.settings.bestseller_image);
            }
        } catch (error) {
            console.error('Error updating hero settings:', error);
            setMessage({ type: 'error', text: 'Greška pri čuvanju podešavanja' });
        } finally {
            setLoading(false);
        }
    };

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
                    </nav>
                </div>
            </div>

            {/* Main content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {activeTab === 'hero' ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-lg shadow px-5 py-6 sm:px-6"
                    >
                        <div className="mb-6">
                            <h2 className="text-lg font-medium text-gray-900">Podešavanja Hero Sekcije</h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Ovde možete podesiti sadržaj koji se prikazuje u hero sekciji na početnoj strani.
                            </p>
                        </div>

                        {message.text && (
                            <div className={`mb-4 p-4 rounded-lg ${
                                message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                            }`}>
                                {message.text}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Naslov bestseller proizvoda
                                    </label>
                                    <input
                                        type="text"
                                        value={heroSettings.bestseller_title || ''}
                                        onChange={(e) => setHeroSettings(prev => ({ ...prev, bestseller_title: e.target.value }))}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Cena
                                    </label>
                                    <div className="mt-1 relative rounded-md shadow-sm">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <span className="text-gray-500 sm:text-sm">€</span>
                                        </div>
                                        <input
                                            type="number"
                                            value={heroSettings.bestseller_price || ''}
                                            onChange={(e) => setHeroSettings(prev => ({ ...prev, bestseller_price: e.target.value }))}
                                            className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            placeholder="0.00"
                                            required
                                            step="0.01"
                                            min="0"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Slika bestseller proizvoda
                                </label>
                                <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="flex-shrink-0">
                                        {previewImage ? (
                                            <img
                                                src={previewImage}
                                                alt="Preview"
                                                className="h-32 w-32 object-cover rounded-lg"
                                            />
                                        ) : (
                                            <div className="h-32 w-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                                                <span className="text-gray-400">Nema slike</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-grow">
                                        <input
                                            type="file"
                                            onChange={handleImageChange}
                                            accept="image/*"
                                            className="block w-full text-sm text-gray-500
                                                file:mr-4 file:py-2 file:px-4
                                                file:rounded-md file:border-0
                                                file:text-sm file:font-medium
                                                file:bg-indigo-50 file:text-indigo-700
                                                hover:file:bg-indigo-100
                                                transition-all"
                                        />
                                        <p className="mt-1 text-xs text-gray-500">
                                            PNG, JPG ili GIF do 2MB
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                                        ${loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Čuvanje...
                                        </>
                                    ) : 'Sačuvaj promene'}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : (
                    <ProductManager />
                )}
            </main>
        </div>
    );
};

export default AdminDashboard; 