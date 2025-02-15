import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../utils/axios';

// Mapiranje naziva boja u HEX vrednosti
const colorMapping = {
    'crna': '#000000',
    'bela': '#FFFFFF',
    'zuta': '#FFD700',
    'plava': '#0000FF',
    'crvena': '#FF0000',
    'zelena': '#008000',
    'siva': '#808080',
    'braon': '#8B4513',
    'ljubicasta': '#800080',
    'narandzasta': '#FFA500',
    'roza': '#FFC0CB',
    'tirkizna': '#40E0D0'
};

// Mapiranje naziva boja u srpski za tooltip
const colorNameMapping = {
    'crna': 'Crna',
    'bela': 'Bela',
    'zuta': 'Žuta',
    'plava': 'Plava',
    'crvena': 'Crvena',
    'zelena': 'Zelena',
    'siva': 'Siva',
    'braon': 'Braon',
    'ljubicasta': 'Ljubičasta',
    'narandzasta': 'Narandžasta',
    'roza': 'Roze',
    'tirkizna': 'Tirkizna'
};

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/api/products/${id}`);
                setProduct(response.data.product);
                // Postavi prvi dostupan size i color kao selektovan
                if (response.data.product.sizes?.length > 0) {
                    setSelectedSize(response.data.product.sizes[0]);
                }
                if (response.data.product.colors?.length > 0) {
                    setSelectedColor(response.data.product.colors[0]);
                }
                setLoading(false);
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Greška pri učitavanju proizvoda');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleQuantityChange = (value) => {
        const newQuantity = quantity + value;
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 bg-gray-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="h-6 w-24 bg-gray-200 rounded mb-8 mx-auto sm:mx-0"></div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            <div className="aspect-square bg-gray-200 rounded-3xl mx-auto lg:mx-0 max-w-xl w-full"></div>
                            <div className="space-y-6 max-w-xl mx-auto lg:mx-0 w-full">
                                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                                </div>
                                <div className="h-12 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center">
                <div className="text-center px-4">
                    <p className="text-red-600 text-lg mb-4">{error || 'Proizvod nije pronađen'}</p>
                    <Link
                        to="/products"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                        <ChevronLeftIcon className="h-5 w-5 mr-1" />
                        Nazad na proizvode
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Nazad dugme */}
                <div className="max-w-6xl mx-auto mb-8 text-center sm:text-left">
                    <Link
                        to="/products"
                        className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                    >
                        <ChevronLeftIcon className="h-5 w-5 mr-1" />
                        Nazad na proizvode
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {/* Slika proizvoda */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-xl mx-auto lg:mx-0 w-full"
                    >
                        <div className="aspect-square bg-white rounded-3xl overflow-hidden shadow-sm">
                            <img
                                src={`${import.meta.env.VITE_API_URL}/storage/${product.image}`}
                                alt={product.name}
                                className="w-full h-full object-cover object-center"
                            />
                        </div>
                    </motion.div>

                    {/* Detalji proizvoda */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-xl mx-auto lg:mx-0 w-full"
                    >
                        <div className="space-y-6">
                            <div className="text-center lg:text-left">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-medium text-gray-900">
                                    €{product.price}
                                </p>
                            </div>

                            <p className="text-gray-600 leading-relaxed text-center lg:text-left">
                                {product.description}
                            </p>

                            {/* Veličine */}
                            {product.sizes && product.sizes.length > 0 && (
                                <div className="text-center lg:text-left">
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                                        Veličina
                                    </h3>
                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                        {product.sizes.map((size) => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                                                    selectedSize === size
                                                        ? 'bg-gray-900 text-white'
                                                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                                }`}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Boje */}
                            {product.colors && product.colors.length > 0 && (
                                <div className="text-center lg:text-left">
                                    <h3 className="text-sm font-medium text-gray-900 mb-3">
                                        Boja
                                    </h3>
                                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                        {product.colors.map((color) => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={`w-8 h-8 rounded-full transition-all duration-200 relative ${
                                                    selectedColor === color
                                                        ? 'ring-2 ring-offset-2 ring-gray-900'
                                                        : ''
                                                } ${color === 'bela' ? 'border border-gray-200' : ''}`}
                                                style={{ backgroundColor: colorMapping[color] || color }}
                                                title={colorNameMapping[color] || color}
                                            >
                                                <span className="sr-only">{colorNameMapping[color] || color}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Količina */}
                            <div className="text-center lg:text-left">
                                <h3 className="text-sm font-medium text-gray-900 mb-3">
                                    Količina
                                </h3>
                                <div className="flex items-center justify-center lg:justify-start space-x-4">
                                    <button
                                        onClick={() => handleQuantityChange(-1)}
                                        disabled={quantity <= 1}
                                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        -
                                    </button>
                                    <span className="text-gray-900 font-medium">{quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(1)}
                                        disabled={quantity >= 10}
                                        className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Dugme za dodavanje u korpu */}
                            <button className="w-full h-14 bg-gray-900 text-white rounded-2xl hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2 text-sm font-medium">
                                <ShoppingBagIcon className="h-5 w-5" />
                                <span>Dodaj u korpu</span>
                            </button>

                            {/* Dodatne informacije */}
                            <div className="pt-6 border-t border-gray-100 space-y-4 text-center lg:text-left">
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                                        Pol
                                    </h3>
                                    <p className="text-gray-600">
                                        {product.gender === 'male' ? 'Muško' :
                                         product.gender === 'female' ? 'Žensko' : 'Unisex'}
                                    </p>
                                </div>
                                {product.material && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                                            Materijal
                                        </h3>
                                        <p className="text-gray-600">{product.material}</p>
                                    </div>
                                )}
                                {product.care && (
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-900 mb-2">
                                            Održavanje
                                        </h3>
                                        <p className="text-gray-600">{product.care}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails; 