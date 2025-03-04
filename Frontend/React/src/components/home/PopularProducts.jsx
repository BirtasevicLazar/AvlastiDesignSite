import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Custom CSS za Swiper
const swiperCustomStyles = `
    .swiper-button-next,
    .swiper-button-prev {
        color: #C72C41;
        background: white;
        padding: 24px;
        border-radius: 50%;
        box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
        transform: scale(0.7);
    }

    .swiper-button-next:after,
    .swiper-button-prev:after {
        font-size: 20px;
        font-weight: bold;
    }

    .swiper-pagination-bullet {
        background: #C72C41;
    }

    .swiper-pagination-bullet-active {
        background: #C72C41;
    }
`;

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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="animate-pulse">
                        <div className="flex flex-col items-center mb-16">
                            <div className="h-10 bg-gray-200 rounded w-64 mb-3"></div>
                            <div className="h-1 bg-gray-200 rounded w-20"></div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[1, 2, 3].map((index) => (
                                <div key={index} className="h-[400px] bg-gray-200 rounded-xl"></div>
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <style>{swiperCustomStyles}</style>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
                        Popularni proizvodi
                    </h2>
                    <div className="w-20 h-1 bg-[#C72C41] rounded-full"></div>
                </motion.div>

                <div className="mb-20">
                    <Swiper
                        spaceBetween={32}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 32 },
                            1024: { slidesPerView: 3, spaceBetween: 48 }
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="!pb-12"
                    >
                        {popularProducts.map(({ product }, index) => (
                            <SwiperSlide key={product.id} className="py-4">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="group relative bg-white rounded-2xl shadow-sm overflow-hidden"
                                >
                                    <Link to={`/products/${product.id}`} className="block">
                                        <div className="aspect-square w-full p-6">
                                            <div className="relative w-full h-full rounded-xl overflow-hidden bg-gray-50">
                                                <img
                                                    src={product.images && product.images.length > 0
                                                        ? `${import.meta.env.VITE_API_URL}/storage/${product.images.find(img => img.is_primary)?.image_path || product.images[0].image_path}`
                                                        : 'https://via.placeholder.com/300x300?text=Nema+slike'
                                                    }
                                                    alt={product.name}
                                                    className="h-full w-full object-cover object-center"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.src = 'https://via.placeholder.com/300x300?text=Nema+slike';
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Link>
                                    <div className="px-6 pb-8 text-center">
                                        <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-2 mx-auto">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-2 text-center">
                                            {product.gender === 'male' ? 'Muška' :
                                             product.gender === 'female' ? 'Ženska' : 'Unisex'} majica
                                        </p>
                                        <p className="text-lg font-medium text-gray-900">
                                            {product.price} RSD
                                        </p>
                                    </div>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center"
                >
                    <Link
                        to="/products"
                        className="group inline-flex items-center justify-center bg-gray-900 text-white px-8 py-4 text-sm font-medium rounded-xl hover:bg-gray-800 transition-all duration-200"
                    >
                        Pogledaj sve proizvode
                        <svg 
                            className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M17 8l4 4m0 0l-4 4m4-4H3" 
                            />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default PopularProducts; 