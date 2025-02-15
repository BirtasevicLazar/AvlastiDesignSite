import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import axiosInstance from '../utils/axios';
import { Link } from 'react-router-dom';

const PRODUCTS_PER_PAGE = 8;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedGender, setSelectedGender] = useState('all');
    const [sortBy, setSortBy] = useState('default');
    const [currentPage, setCurrentPage] = useState(1);

    // Mapiranje frontend vrednosti u backend vrednosti
    const genderMapping = {
        all: 'all',
        musko: 'male',
        zensko: 'female',
        unisex: 'unisex'
    };

    // Mapiranje backend vrednosti u frontend vrednosti
    const reverseGenderMapping = {
        male: 'musko',
        female: 'zensko',
        unisex: 'unisex'
    };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axiosInstance.get('/api/products');
                setProducts(response.data.products);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Greška pri učitavanju proizvoda');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Reset page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedGender, sortBy]);

    const filteredAndSortedProducts = products
        .filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesGender = selectedGender === 'all' || 
                                reverseGenderMapping[product.gender] === selectedGender;
            return matchesSearch && matchesGender;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'price-asc':
                    return a.price - b.price;
                case 'price-desc':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

    // Paginacija
    const totalPages = Math.ceil(filteredAndSortedProducts.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = filteredAndSortedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Generisanje niza stranica za prikaz
    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        
        if (totalPages <= maxPagesToShow) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                pageNumbers.push(1);
                pageNumbers.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i);
                }
                pageNumbers.push('...');
                pageNumbers.push(totalPages);
            }
        }
        
        return pageNumbers;
    };

    if (loading) {
        return (
            <div className="min-h-screen pt-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse space-y-8">
                        {/* Filter skeleton */}
                        <div className="max-w-xl mx-auto space-y-4">
                            <div className="h-12 bg-white rounded-full w-full"></div>
                            <div className="flex justify-center space-x-4">
                                <div className="h-10 bg-white rounded-full w-24"></div>
                                <div className="h-10 bg-white rounded-full w-24"></div>
                                <div className="h-10 bg-white rounded-full w-24"></div>
                            </div>
                        </div>
                        {/* Products grid skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[1, 2, 3, 4, 5, 6, 8].map((index) => (
                                <div key={index} className="bg-white rounded-3xl p-4">
                                    <div className="aspect-square bg-gray-100 rounded-2xl mb-4"></div>
                                    <div className="space-y-3 px-2">
                                        <div className="h-4 bg-gray-100 rounded-full w-3/4"></div>
                                        <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen pt-20 bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">
                    <p className="text-red-600 text-lg">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filteri */}
                <div className="max-w-xl mx-auto mb-12 space-y-4">
                    {/* Pretraga */}
                    <div className="relative">
                        <MagnifyingGlassIcon className="h-5 w-5 absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Pretraži proizvode..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full h-12 pl-12 pr-4 rounded-full border-0 bg-white shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-teal-500 text-sm"
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        {/* Pol filter */}
                        <div className="flex justify-center w-full sm:w-auto">
                            <div className="inline-flex rounded-full bg-white shadow-sm ring-1 ring-inset ring-gray-200 p-1">
                                {['all', 'musko', 'zensko', 'unisex'].map((gender) => (
                                    <button
                                        key={gender}
                                        onClick={() => setSelectedGender(gender)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 min-w-[80px] ${
                                            selectedGender === gender
                                                ? 'bg-teal-500 text-white shadow-sm'
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        {gender === 'all' ? 'Svi' : 
                                         gender === 'musko' ? 'Muško' :
                                         gender === 'zensko' ? 'Žensko' : 'Unisex'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sortiranje */}
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="w-full sm:w-auto h-11 px-4 rounded-full bg-white shadow-sm ring-1 ring-inset ring-gray-200 text-sm text-gray-500 focus:ring-2 focus:ring-teal-500"
                        >
                            <option value="default">Sortiraj po</option>
                            <option value="price-asc">Najniža cena</option>
                            <option value="price-desc">Najviša cena</option>
                        </select>
                    </div>
                </div>

                {/* Lista proizvoda */}
                {filteredAndSortedProducts.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-gray-600 text-lg">Nema pronađenih proizvoda.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
                            {paginatedProducts.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group"
                                >
                                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                                        <Link to={`/products/${product.id}`} className="block">
                                            <div className="aspect-square overflow-hidden">
                                                <img
                                                    src={`${import.meta.env.VITE_API_URL}/storage/${product.image}`}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
                                                />
                                            </div>
                                            <div className="p-6">
                                                <h3 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1 text-center">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-500 mb-3 line-clamp-2 text-sm text-center">
                                                    {product.description}
                                                </p>
                                                <p className="text-sm text-gray-600 mb-2 text-center">
                                                    {product.gender === 'male' ? 'Muška' :
                                                     product.gender === 'female' ? 'Ženska' : 'Unisex'} majica
                                                </p>
                                                <div className="text-center">
                                                    <span className="text-lg font-medium text-gray-900">
                                                        €{product.price}
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Paginacija */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className={`p-2 rounded-full transition-all duration-200 ${
                                        currentPage === 1
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <ChevronLeftIcon className="h-5 w-5" />
                                </button>

                                {getPageNumbers().map((pageNumber, index) => (
                                    <button
                                        key={index}
                                        onClick={() => typeof pageNumber === 'number' && handlePageChange(pageNumber)}
                                        disabled={pageNumber === '...'}
                                        className={`min-w-[40px] h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-200 ${
                                            pageNumber === currentPage
                                                ? 'bg-gray-900 text-white'
                                                : pageNumber === '...'
                                                ? 'text-gray-400 cursor-default'
                                                : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                        }`}
                                    >
                                        {pageNumber}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className={`p-2 rounded-full transition-all duration-200 ${
                                        currentPage === totalPages
                                            ? 'text-gray-300 cursor-not-allowed'
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                    }`}
                                >
                                    <ChevronRightIcon className="h-5 w-5" />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Products; 