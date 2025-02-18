import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';

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
            className="bg-white rounded-lg shadow px-5 py-6 sm:px-6"
        >
            <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900">Podešavanja Hero Sekcije</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Izaberite proizvod koji će se prikazivati u hero sekciji na početnoj strani.
                </p>
            </div>

            {message.text && (
                <div className={`mb-4 p-4 rounded-lg ${
                    message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}

            {currentProduct && (
                <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Trenutno izabrani proizvod:</h3>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-16 h-16">
                            <img
                                src={`${import.meta.env.VITE_API_URL}/storage/${currentProduct.image}`}
                                alt={currentProduct.name}
                                className="w-full h-full object-cover rounded"
                            />
                        </div>
                        <div>
                            <h4 className="text-sm font-medium text-gray-900">{currentProduct.name}</h4>
                            <p className="text-sm text-gray-500">{currentProduct.price} RSD</p>
                        </div>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Izaberite novi proizvod za hero sekciju
                    </label>
                    <div className="mt-2">
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="">Izaberite proizvod</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} - {product.price} RSD
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={!selectedProduct || loading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                            ${loading || !selectedProduct ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
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
    );
};

export default HeroManager; 