import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import { TrashIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';

const PopularProductsManager = () => {
    const [popularProducts, setPopularProducts] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [selectedProduct, setSelectedProduct] = useState('');

    useEffect(() => {
        fetchPopularProducts();
        fetchAvailableProducts();
    }, []);

    const fetchPopularProducts = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/popular-products');
            setPopularProducts(response.data.popular_products);
        } catch (error) {
            console.error('Error fetching popular products:', error);
            setMessage({ type: 'error', text: 'Greška pri učitavanju popularnih proizvoda' });
        }
    };

    const fetchAvailableProducts = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/popular-products/available');
            setAvailableProducts(response.data.available_products);
        } catch (error) {
            console.error('Error fetching available products:', error);
        }
    };

    const handleAddPopular = async () => {
        if (!selectedProduct) return;

        setLoading(true);
        try {
            await axiosInstance.post('/api/admin/popular-products', {
                product_id: selectedProduct,
                display_order: popularProducts.length
            });

            setMessage({ type: 'success', text: 'Proizvod je dodat u popularne' });
            setSelectedProduct('');
            await fetchPopularProducts();
            await fetchAvailableProducts();
        } catch (error) {
            console.error('Error adding popular product:', error);
            setMessage({ type: 'error', text: 'Greška pri dodavanju proizvoda' });
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = async (id) => {
        if (!window.confirm('Da li ste sigurni da želite da uklonite ovaj proizvod iz popularnih?')) return;

        try {
            await axiosInstance.delete(`/api/admin/popular-products/${id}`);
            setMessage({ type: 'success', text: 'Proizvod je uklonjen iz popularnih' });
            await fetchPopularProducts();
            await fetchAvailableProducts();
        } catch (error) {
            console.error('Error removing popular product:', error);
            setMessage({ type: 'error', text: 'Greška pri uklanjanju proizvoda' });
        }
    };

    const handleReorder = async (id, direction) => {
        const currentIndex = popularProducts.findIndex(p => p.id === id);
        if (
            (direction === 'up' && currentIndex === 0) ||
            (direction === 'down' && currentIndex === popularProducts.length - 1)
        ) return;

        const newProducts = [...popularProducts];
        const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
        [newProducts[currentIndex], newProducts[targetIndex]] = [newProducts[targetIndex], newProducts[currentIndex]];

        const orders = newProducts.map((product, index) => ({
            id: product.id,
            display_order: index
        }));

        try {
            await axiosInstance.post('/api/admin/popular-products/order', { orders });
            await fetchPopularProducts();
        } catch (error) {
            console.error('Error reordering products:', error);
            setMessage({ type: 'error', text: 'Greška pri promeni redosleda' });
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
                <h2 className="text-lg font-medium text-gray-900">Popularni Proizvodi</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Upravljajte proizvodima koji se prikazuju u sekciji popularnih proizvoda.
                </p>
            </div>

            {message.text && (
                <div className={`mb-4 p-4 rounded-lg ${
                    message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                    Dodaj novi popularni proizvod
                </label>
                <div className="mt-2 flex gap-4">
                    <select
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="">Izaberite proizvod</option>
                        {availableProducts.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name} - {product.price} RSD
                            </option>
                        ))}
                    </select>
                    <button
                        type="button"
                        onClick={handleAddPopular}
                        disabled={!selectedProduct || loading}
                        className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                            ${loading || !selectedProduct ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'}`}
                    >
                        Dodaj
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Trenutni popularni proizvodi</h3>
                <div className="space-y-4">
                    {popularProducts.map(({ id, product }, index) => (
                        <div
                            key={id}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                        >
                            <div className="flex-shrink-0 w-16 h-16">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/storage/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover rounded"
                                />
                            </div>
                            <div className="flex-grow">
                                <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                                <p className="text-sm text-gray-500">{product.price} RSD</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleReorder(id, 'up')}
                                    disabled={index === 0}
                                    className={`p-1 rounded-md ${index === 0 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <ArrowUpIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleReorder(id, 'down')}
                                    disabled={index === popularProducts.length - 1}
                                    className={`p-1 rounded-md ${index === popularProducts.length - 1 ? 'text-gray-400' : 'text-gray-600 hover:bg-gray-100'}`}
                                >
                                    <ArrowDownIcon className="h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => handleRemove(id)}
                                    className="p-1 rounded-md text-red-600 hover:bg-red-50"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default PopularProductsManager; 