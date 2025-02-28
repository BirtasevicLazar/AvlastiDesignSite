import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import { 
    TrashIcon, 
    ArrowUpIcon, 
    ArrowDownIcon,
    PlusIcon,
    StarIcon
} from '@heroicons/react/24/outline';

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
            className="bg-white rounded-2xl shadow-sm"
        >
            <div className="border-b border-gray-100">
                <div className="px-6 py-5">
                    <h2 className="text-xl font-semibold text-gray-900">Popularni Proizvodi</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Upravljajte proizvodima koji se prikazuju u sekciji popularnih proizvoda.
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
                {/* Dodavanje novog popularnog proizvoda */}
                <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">Dodaj novi popularni proizvod</h3>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                            className="flex-grow rounded-lg border-gray-300 shadow-sm focus:border-[#C72C41] focus:ring-[#C72C41]"
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
                            className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-[#C72C41] hover:bg-[#a42435] transition-colors ${
                                loading || !selectedProduct ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            Dodaj
                        </button>
                    </div>
                </div>

                {/* Lista popularnih proizvoda */}
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-900">Trenutni popularni proizvodi</h3>
                    <div className="bg-gray-50 rounded-xl divide-y divide-gray-100">
                        {popularProducts.map(({ id, product }, index) => (
                            <div
                                key={id}
                                className="flex items-center gap-4 p-4 first:rounded-t-xl last:rounded-b-xl hover:bg-gray-100 transition-colors"
                            >
                                <div className="flex-shrink-0">
                                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white">
                                        <img
                                            src={product.images && product.images.length > 0
                                                ? `${import.meta.env.VITE_API_URL}/storage/${product.images.find(img => img.is_primary)?.image_path || product.images[0].image_path}`
                                                : 'https://via.placeholder.com/150x150?text=Nema+slike'
                                            }
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = 'https://via.placeholder.com/150x150?text=Nema+slike';
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="flex-grow min-w-0">
                                    <h4 className="text-sm font-medium text-gray-900 truncate">{product.name}</h4>
                                    <p className="text-sm text-gray-500">{product.price} RSD</p>
                                    <div className="mt-1 flex items-center">
                                        <StarIcon className="w-4 h-4 text-yellow-400 mr-1" />
                                        <span className="text-xs text-gray-500">Popularni proizvod #{index + 1}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleReorder(id, 'up')}
                                        disabled={index === 0}
                                        className={`p-1.5 rounded-lg transition-colors ${
                                            index === 0 
                                                ? 'text-gray-300 cursor-not-allowed' 
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                                        }`}
                                    >
                                        <ArrowUpIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleReorder(id, 'down')}
                                        disabled={index === popularProducts.length - 1}
                                        className={`p-1.5 rounded-lg transition-colors ${
                                            index === popularProducts.length - 1
                                                ? 'text-gray-300 cursor-not-allowed'
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-200'
                                        }`}
                                    >
                                        <ArrowDownIcon className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleRemove(id)}
                                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ))}
                        {popularProducts.length === 0 && (
                            <div className="p-8 text-center">
                                <StarIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                <p className="text-sm text-gray-500">Još uvek nema popularnih proizvoda</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default PopularProductsManager; 