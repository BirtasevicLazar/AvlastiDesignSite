import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import { TrashIcon, PencilIcon } from '@heroicons/react/24/outline';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        image: null,
        gender: 'male',
        colors: ['']
    });
    const [previewImage, setPreviewImage] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axiosInstance.get('/api/products');
            setProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
            setMessage({ type: 'error', text: 'Greška pri učitavanju proizvoda' });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setNewProduct(prev => ({ ...prev, image: file }));
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const handleColorChange = (index, value) => {
        const updatedColors = [...newProduct.colors];
        updatedColors[index] = value;
        setNewProduct(prev => ({ ...prev, colors: updatedColors }));
    };

    const addColorField = () => {
        setNewProduct(prev => ({
            ...prev,
            colors: [...prev.colors, '']
        }));
    };

    const removeColorField = (index) => {
        setNewProduct(prev => ({
            ...prev,
            colors: prev.colors.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price);
            formData.append('image', newProduct.image);
            formData.append('gender', newProduct.gender);
            newProduct.colors.forEach(color => {
                if (color.trim()) formData.append('colors[]', color.trim());
            });

            await axiosInstance.post('/api/admin/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage({ type: 'success', text: 'Proizvod je uspešno dodat' });
            setNewProduct({
                name: '',
                price: '',
                image: null,
                gender: 'male',
                colors: ['']
            });
            setPreviewImage(null);
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            setMessage({ type: 'error', text: 'Greška pri dodavanju proizvoda' });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (productId) => {
        if (!window.confirm('Da li ste sigurni da želite da obrišete ovaj proizvod?')) return;

        try {
            await axiosInstance.delete(`/api/admin/products/${productId}`);
            setMessage({ type: 'success', text: 'Proizvod je uspešno obrisan' });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
            setMessage({ type: 'error', text: 'Greška pri brisanju proizvoda' });
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
                <h2 className="text-lg font-medium text-gray-900">Upravljanje Proizvodima</h2>
                <p className="mt-1 text-sm text-gray-600">
                    Dodajte nove proizvode ili upravljajte postojećim.
                </p>
            </div>

            {message.text && (
                <div className={`mb-4 p-4 rounded-lg ${
                    message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
                }`}>
                    {message.text}
                </div>
            )}

            {/* Form for adding new product */}
            <form onSubmit={handleSubmit} className="space-y-6 mb-8">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Naziv proizvoda
                        </label>
                        <input
                            type="text"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Cena
                        </label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <input
                                type="number"
                                name="price"
                                id="price"
                                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="0.00"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                                required
                            />
                            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                <span className="text-gray-500 sm:text-sm">RSD</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Pol
                    </label>
                    <select
                        value={newProduct.gender}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, gender: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value="male">Muški</option>
                        <option value="female">Ženski</option>
                        <option value="unisex">Unisex</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Boje
                    </label>
                    <div className="mt-2 space-y-2">
                        {newProduct.colors.map((color, index) => (
                            <div key={index} className="flex gap-2">
                                <input
                                    type="text"
                                    value={color}
                                    onChange={(e) => handleColorChange(index, e.target.value)}
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    placeholder="Unesite boju"
                                    required
                                />
                                {index > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => removeColorField(index)}
                                        className="inline-flex items-center p-2 border border-transparent rounded-md text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                    >
                                        <TrashIcon className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addColorField}
                            className="mt-2 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Dodaj još jednu boju
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Slika proizvoda
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
                                required
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
                                Dodavanje...
                            </>
                        ) : 'Dodaj proizvod'}
                    </button>
                </div>
            </form>

            {/* Products list */}
            <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Postojeći proizvodi</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="relative bg-white border rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
                        >
                            <img
                                src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL}/storage/${product.image}`}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-md mb-4"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/300x200?text=Nema+slike';
                                }}
                            />
                            <h4 className="text-lg font-medium text-gray-900">{product.name}</h4>
                            <p className="text-sm text-gray-500 mb-2">{product.price} RSD</p>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {product.colors.map((color, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                                    >
                                        {color}
                                    </span>
                                ))}
                            </div>
                            <div className="absolute top-2 right-2 flex gap-2">
                                <button
                                    onClick={() => handleDelete(product.id)}
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

export default ProductManager; 