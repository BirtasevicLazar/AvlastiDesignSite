import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import { 
    TrashIcon, 
    PlusIcon,
    PhotoIcon,
    TagIcon,
    SwatchIcon,
    UserGroupIcon
} from '@heroicons/react/24/outline';

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
            className="bg-white rounded-2xl shadow-sm"
        >
            <div className="border-b border-gray-100">
                <div className="px-6 py-5">
                    <h2 className="text-xl font-semibold text-gray-900">Upravljanje Proizvodima</h2>
                    <p className="mt-1 text-sm text-gray-500">
                        Dodajte nove proizvode ili upravljajte postojećim.
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

            <div className="p-6">
                <form id="add-product-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center gap-2">
                                    <PhotoIcon className="w-4 h-4" />
                                    Slika proizvoda
                                </span>
                            </label>
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors max-w-xs mx-auto">
                                {previewImage ? (
                                    <img
                                        src={previewImage}
                                        alt="Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <p className="text-gray-500 text-xs">Klikni za dodavanje slike</p>
                                )}
                                <input
                                    id="productImage"
                                    type="file"
                                    onChange={handleImageChange}
                                    accept="image/*"
                                    className="hidden"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        setPreviewImage(null);
                                        setNewProduct(prev => ({ ...prev, image: null }));
                                    }}
                                    className={`absolute top-2 right-2 p-1.5 bg-white rounded-lg text-gray-600 hover:text-red-600 transition-colors ${previewImage ? '' : 'hidden'}`}
                                >
                                    <TrashIcon className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center gap-2">
                                    <TagIcon className="w-4 h-4" />
                                    Naziv proizvoda
                                </span>
                            </label>
                            <input
                                type="text"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                                className="w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center gap-2">
                                    <TagIcon className="w-4 h-4" />
                                    Cena
                                </span>
                            </label>
                            <div className="relative rounded-lg shadow-sm">
                                <input
                                    type="number"
                                    value={newProduct.price}
                                    onChange={(e) => setNewProduct(prev => ({ ...prev, price: e.target.value }))}
                                    className="w-full rounded-lg border-gray-200 pr-12 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                    placeholder="0.00"
                                    required
                                />
                                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                    <span className="text-gray-500 text-sm">RSD</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center gap-2">
                                    <UserGroupIcon className="w-4 h-4" />
                                    Pol
                                </span>
                            </label>
                            <select
                                value={newProduct.gender}
                                onChange={(e) => setNewProduct(prev => ({ ...prev, gender: e.target.value }))}
                                className="w-full rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                            >
                                <option value="male">Muški</option>
                                <option value="female">Ženski</option>
                                <option value="unisex">Unisex</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center gap-2">
                                    <SwatchIcon className="w-4 h-4" />
                                    Dostupne boje
                                </span>
                            </label>
                            <div className="space-y-2">
                                {newProduct.colors.map((color, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={color}
                                            onChange={(e) => handleColorChange(index, e.target.value)}
                                            className="flex-1 rounded-lg border-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                                            placeholder="Unesite boju"
                                            required
                                        />
                                        {index > 0 && (
                                            <button
                                                type="button"
                                                onClick={() => removeColorField(index)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <TrashIcon className="w-4 h-4" />
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addColorField}
                                    className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    <PlusIcon className="w-4 h-4 mr-1" />
                                    Dodaj boju
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>

            {/* Lista proizvoda */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-6">Postojeći proizvodi</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="group relative bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:border-gray-300 transition-all"
                        >
                            <div className="aspect-square bg-gray-100">
                                <img
                                    src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_API_URL}/storage/${product.image}`}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/300x300?text=Nema+slike';
                                    }}
                                />
                            </div>
                            <div className="p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="text-sm font-medium text-gray-900">{product.name}</h4>
                                        <p className="mt-1 text-sm text-gray-500">{product.price} RSD</p>
                                    </div>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                    >
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="mt-3 flex flex-wrap gap-1">
                                    {product.colors.map((color, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800"
                                        >
                                            {color}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-3 flex items-center text-xs text-gray-500">
                                    <UserGroupIcon className="w-4 h-4 mr-1" />
                                    {product.gender === 'male' ? 'Muška' : product.gender === 'female' ? 'Ženska' : 'Unisex'} majica
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ProductManager; 