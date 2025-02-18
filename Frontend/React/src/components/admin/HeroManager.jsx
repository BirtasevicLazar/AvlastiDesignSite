import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import { PhotoIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

const HeroManager = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [currentProduct, setCurrentProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchProducts();
        fetchCurrentSettings();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/hero-settings/available-products');
            setProducts(response.data.available_products);
        } catch (error) {
            console.error('Error fetching products:', error);
            setMessage({ type: 'error', text: 'Greška pri učitavanju proizvoda' });
        }
    };

    const fetchCurrentSettings = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/hero-settings');
            if (response.data.featured_product) {
                setCurrentProduct(response.data.featured_product);
            }
        } catch (error) {
            console.error('Error fetching hero settings:', error);
            setMessage({ type: 'error', text: 'Greška pri učitavanju trenutnih podešavanja' });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedProduct) return;

        setLoading(true);
        try {
            const response = await axiosInstance.post('/api/admin/hero-settings', {
                featured_product_id: selectedProduct
            });

            setMessage({ type: 'success', text: 'Podešavanja su uspešno sačuvana' });
            setCurrentProduct(response.data.featured_product);
            setSelectedProduct('');
        } catch (error) {
            console.error('Error updating hero settings:', error);
            setMessage({ type: 'error', text: 'Greška pri čuvanju podešavanja' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm"
        >
            <div className="border-b border-gray-100">
                <div className="px-6 py-5">
                    <h2 className="text-xl font-semibold text-gray-900">Hero Sekcija</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Izaberite proizvod koji će se prikazivati na početnoj strani.
                    </p>
                </div>
            </div>

            {message.text && (
                <div className={`mx-6 mt-6 p-4 rounded-xl ${
                    message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="p-6 space-y-8">
                {/* Trenutni proizvod */}
                {currentProduct && (
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h3 className="text-sm font-medium text-gray-900 mb-4">Trenutno izabrani proizvod</h3>
                        <div className="flex items-center gap-6">
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-white shadow-sm">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/storage/${currentProduct.image}`}
                                    alt={currentProduct.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="text-base font-medium text-gray-900">{currentProduct.name}</h4>
                                <p className="text-sm text-gray-500 mt-1">{currentProduct.price} RSD</p>
                                <div className="mt-3">
                                    <button
                                        onClick={fetchProducts}
                                        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
                                    >
                                        <ArrowPathIcon className="w-4 h-4 mr-1" />
                                        Osveži listu proizvoda
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Forma za izbor novog proizvoda */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Izaberite novi proizvod
                        </label>
                        <div className="flex gap-4">
                            <select
                                value={selectedProduct}
                                onChange={(e) => setSelectedProduct(e.target.value)}
                                className="flex-grow rounded-xl border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="">Izaberite proizvod</option>
                                {products.map((product) => (
                                    <option key={product.id} value={product.id}>
                                        {product.name} - {product.price} RSD
                                    </option>
                                ))}
                            </select>
                            <button
                                type="submit"
                                disabled={!selectedProduct || loading}
                                className={`px-6 py-2 rounded-xl text-white font-medium transition-all duration-200 ${
                                    !selectedProduct || loading
                                        ? 'bg-gray-300 cursor-not-allowed'
                                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-sm hover:shadow'
                                }`}
                            >
                                {loading ? 'Čuvanje...' : 'Sačuvaj'}
                            </button>
                        </div>
                    </div>
                </form>

                {/* Pomoćni tekst */}
                {!currentProduct && (
                    <div className="text-center py-12">
                        <PhotoIcon className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-sm text-gray-500">
                            Još uvek niste izabrali proizvod za hero sekciju
                        </p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default HeroManager; 