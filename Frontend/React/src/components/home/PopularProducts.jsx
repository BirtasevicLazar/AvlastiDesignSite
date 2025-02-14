import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';

const PopularProducts = () => {
    const [popularProducts, setPopularProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPopularProducts = async () => {
            try {
                const response = await axiosInstance.get('/api/popular-products');
                setPopularProducts(response.data.popular_products);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching popular products:', err);
                setError('Greška pri učitavanju popularnih proizvoda');
                setLoading(false);
            }
        };

        fetchPopularProducts();
    }, []);

    if (loading) {
        return (
            <section className="py-20 sm:py-28">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="flex flex-col items-center mb-16">
                            <div className="h-10 bg-gray-200 rounded w-64 mb-3"></div>
                            <div className="h-1 bg-gray-200 rounded w-20"></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
                            {[1, 2, 3].map((index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="aspect-square w-full bg-gray-200 rounded-2xl mb-6"></div>
                                    <div className="h-6 bg-gray-200 rounded w-48 mb-3"></div>
                                    <div className="h-5 bg-gray-200 rounded w-20"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 sm:py-28">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="text-red-600">{error}</p>
                    </div>
                </div>
            </section>
        );
    }

    if (popularProducts.length === 0) {
        return null;
    }

    return (
        <section className="py-20 sm:py-28">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Popularni proizvodi
                    </h2>
                    <div className="w-20 h-1 bg-teal-500 rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
                    {popularProducts.map(({ product }, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group flex flex-col items-center"
                        >
                            <div className="w-full aspect-square mb-6 p-2">
                                <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gray-50">
                                    <img
                                        src={`${import.meta.env.VITE_API_URL}/storage/${product.image}`}
                                        alt={product.name}
                                        className="h-full w-full object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-3 text-center">
                                {product.name}
                            </h3>
                            <p className="text-xl font-semibold text-teal-600">
                                €{product.price}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PopularProducts; 