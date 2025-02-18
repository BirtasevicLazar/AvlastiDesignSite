import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ShoppingBagIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';
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

// Dostupne veličine
const availableSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'];

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addedToCart, setAddedToCart] = useState(false);
    const [validationError, setValidationError] = useState(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/api/products/${id}`);
                setProduct(response.data.product);
                // Postavi prvi dostupan size i color kao selektovan
                if (response.data.product.sizes?.length > 0) {
                    setSelectedSize(response.data.product.sizes[0]);
                } else {
                    setSelectedSize(availableSizes[3]); // Default 'L'
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

    const handleAddToCart = () => {
        setValidationError(null);

        if (!selectedSize) {
            setValidationError('Molimo izaberite veličinu');
            return;
        }

        if (product.colors && product.colors.length > 0 && !selectedColor) {
            setValidationError('Molimo izaberite boju');
            return;
        }

        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: `${import.meta.env.VITE_API_URL}/storage/${product.image}`,
            size: selectedSize,
            color: selectedColor,
            quantity: quantity,
            colors: product.colors // Dodajemo informaciju o dostupnim bojama
        };

        const success = addToCart(cartItem);
        
        if (success) {
            setAddedToCart(true);
            setValidationError(null);

            // Reset the "Added to cart" message after 2 seconds
            setTimeout(() => {
                setAddedToCart(false);
            }, 2000);
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
        <div className="min-h-screen pt-20 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Glavni sadržaj - Slika i detalji */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Slika proizvoda */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="w-full"
                    >
                        <div className="aspect-square bg-white rounded-3xl overflow-hidden border border-gray-100">
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
                        className="bg-white rounded-3xl p-6 border border-gray-100 flex flex-col justify-between h-full"
                    >
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h1 className="text-3xl font-bold text-gray-900 text-center lg:text-left">
                                    {product.name}
                                </h1>
                                <p className="text-2xl font-medium text-gray-900 text-center lg:text-left">
                                    €{product.price}
                                </p>
                                <p className="text-gray-600 leading-relaxed text-center lg:text-left">
                                    {product.description}
                                </p>
                            </div>

                            {/* Veličine */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3 text-center lg:text-left">
                                    Veličina
                                </h3>
                                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                    {(product?.sizes?.length > 0 ? product.sizes : availableSizes).map((size) => (
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

                            {/* Boje */}
                            {product.colors && product.colors.length > 0 && (
                                <div>
                                    <h3 className="text-sm font-medium text-gray-900 mb-3 text-center lg:text-left">
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
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3 text-center lg:text-left">
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

                            {/* Validation Error */}
                            <AnimatePresence>
                                {validationError && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        className="flex items-center space-x-2 text-red-600 bg-red-50 px-4 py-2 rounded-lg"
                                    >
                                        <ExclamationCircleIcon className="h-5 w-5" />
                                        <p className="text-sm">{validationError}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="space-y-6 mt-6">
                            {/* Dugme za dodavanje u korpu */}
                            <button 
                                onClick={handleAddToCart}
                                className={`w-full h-14 rounded-2xl transition-colors duration-200 flex items-center justify-center space-x-2 text-sm font-medium ${
                                    addedToCart 
                                        ? 'bg-green-600 hover:bg-green-700 text-white'
                                        : 'bg-gray-900 hover:bg-gray-800 text-white'
                                }`}
                            >
                                <ShoppingBagIcon className="h-5 w-5" />
                                <span>{addedToCart ? 'Dodato u korpu!' : 'Dodaj u korpu'}</span>
                            </button>

                            {/* Dodatne informacije o dostavi */}
                            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                <div className="text-center">
                                    <h4 className="text-sm font-medium text-gray-900 mb-1">Besplatna dostava</h4>
                                    <p className="text-xs text-gray-600">za porudžbine preko €50</p>
                                </div>
                                <div className="text-center">
                                    <h4 className="text-sm font-medium text-gray-900 mb-1">Sigurna kupovina</h4>
                                    <p className="text-xs text-gray-600">100% sigurno plaćanje</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Informacije o proizvodu - Puna širina */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-3xl p-8 border border-gray-100"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Informacije o proizvodu */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Informacije o proizvodu</h3>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Materijal</h4>
                                        <p className="text-gray-600">100% Pamuk</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Održavanje</h4>
                                        <p className="text-gray-600">Pranje na 30°C</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Zemlja porekla</h4>
                                        <p className="text-gray-600">Srbija</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Štampa</h4>
                                        <p className="text-gray-600">Digitalna štampa visokog kvaliteta</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Dostava</h4>
                                        <p className="text-gray-600">2-4 radna dana</p>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">Garancija</h4>
                                        <p className="text-gray-600">30 dana povrat novca</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Vodič za veličine */}
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-6">Vodič za veličine</h3>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Veličina</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Grudi (cm)</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dužina (cm)</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {availableSizes.map((size, index) => (
                                            <tr key={size} className={index % 2 === 0 ? 'bg-gray-50' : ''}>
                                                <td className="px-4 py-2 text-sm text-gray-900">{size}</td>
                                                <td className="px-4 py-2 text-sm text-gray-600">{90 + index * 4}</td>
                                                <td className="px-4 py-2 text-sm text-gray-600">{65 + index * 2}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ProductDetails; 