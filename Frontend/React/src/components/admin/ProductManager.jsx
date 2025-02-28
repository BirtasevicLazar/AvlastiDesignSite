import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import { 
    TrashIcon, 
    PlusIcon,
    PhotoIcon,
    TagIcon,
    SwatchIcon,
    UserGroupIcon,
    PencilIcon,
    XMarkIcon,
    StarIcon
} from '@heroicons/react/24/outline';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        name: '',
        price: '',
        images: [],
        newImages: [],
        removeImages: [],
        gender: 'male',
        colors: ['']
    });
    const [editPreviewImages, setEditPreviewImages] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        images: [],
        gender: 'male',
        colors: ['']
    });
    const [previewImages, setPreviewImages] = useState([]);

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
        const files = Array.from(e.target.files);
        setNewProduct(prev => ({ ...prev, images: [...prev.images, ...files] }));
        
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...newPreviewUrls]);
    };

    const removeImage = (index) => {
        setNewProduct(prev => ({
            ...prev,
            images: prev.images.filter((_, i) => i !== index)
        }));
        
        URL.revokeObjectURL(previewImages[index]);
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
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
        
        if (newProduct.images.length === 0) {
            setMessage({ type: 'error', text: 'Morate dodati bar jednu sliku' });
            return;
        }

        if (newProduct.colors.every(color => !color.trim())) {
            setMessage({ type: 'error', text: 'Morate dodati bar jednu boju' });
            return;
        }

        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const formData = new FormData();
            formData.append('name', newProduct.name);
            formData.append('price', newProduct.price);
            formData.append('gender', newProduct.gender);
            
            // Dodaj samo neprazne boje
            newProduct.colors
                .filter(color => color.trim())
                .forEach(color => {
                    formData.append('colors[]', color.trim());
                });

            // Dodaj slike
            newProduct.images.forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });

            const response = await axiosInstance.post('/api/admin/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage({ type: 'success', text: 'Proizvod je uspešno dodat' });
            setNewProduct({
                name: '',
                price: '',
                images: [],
                gender: 'male',
                colors: ['']
            });
            setPreviewImages([]);
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
            const errorMessage = error.response?.data?.error || 'Greška pri dodavanju proizvoda';
            setMessage({ type: 'error', text: errorMessage });
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

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setEditedProduct({
            name: product.name,
            price: product.price,
            gender: product.gender,
            colors: [...product.colors],
            images: product.images || [],
            newImages: [],
            removeImages: []
        });
        setEditPreviewImages([]);
        setIsEditModalOpen(true);
    };

    const handleEditImageChange = (e) => {
        const files = Array.from(e.target.files);
        setEditedProduct(prev => ({
            ...prev,
            newImages: [...prev.newImages, ...files]
        }));
        
        const newPreviewUrls = files.map(file => URL.createObjectURL(file));
        setEditPreviewImages(prev => [...prev, ...newPreviewUrls]);
    };

    const handleEditColorChange = (index, value) => {
        const updatedColors = [...editedProduct.colors];
        updatedColors[index] = value;
        setEditedProduct(prev => ({ ...prev, colors: updatedColors }));
    };

    const addEditColorField = () => {
        setEditedProduct(prev => ({
            ...prev,
            colors: [...prev.colors, '']
        }));
    };

    const removeEditColorField = (index) => {
        setEditedProduct(prev => ({
            ...prev,
            colors: prev.colors.filter((_, i) => i !== index)
        }));
    };

    const removeEditImage = (index, isExisting = false) => {
        if (isExisting) {
            const imageToRemove = editedProduct.images[index];
            setEditedProduct(prev => ({
                ...prev,
                images: prev.images.filter((_, i) => i !== index),
                removeImages: [...prev.removeImages, imageToRemove.id]
            }));
        } else {
            const adjustedIndex = index - editedProduct.images.length;
            URL.revokeObjectURL(editPreviewImages[adjustedIndex]);
            setEditedProduct(prev => ({
                ...prev,
                newImages: prev.newImages.filter((_, i) => i !== adjustedIndex)
            }));
            setEditPreviewImages(prev => prev.filter((_, i) => i !== adjustedIndex));
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const formData = new FormData();
            formData.append('name', editedProduct.name);
            formData.append('price', editedProduct.price);
            formData.append('gender', editedProduct.gender);
            editedProduct.colors.forEach(color => {
                if (color.trim()) formData.append('colors[]', color.trim());
            });
            editedProduct.newImages.forEach(image => {
                formData.append('new_images[]', image);
            });
            editedProduct.removeImages.forEach(imageId => {
                formData.append('remove_images[]', imageId);
            });
            formData.append('_method', 'PUT');

            await axiosInstance.post(`/api/admin/products/${selectedProduct.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setMessage({ type: 'success', text: 'Proizvod je uspešno izmenjen' });
            setIsEditModalOpen(false);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
            setMessage({ type: 'error', text: 'Greška pri izmeni proizvoda' });
        } finally {
            setLoading(false);
        }
    };

    const handleSetPrimaryImage = async (imageId) => {
        try {
            await axiosInstance.post(`/api/admin/products/${selectedProduct.id}/set-primary-image`, { image_id: imageId });
            setMessage({ type: 'success', text: 'Slika je uspešno postavljena kao glavna' });
            fetchProducts();
        } catch (error) {
            console.error('Error setting primary image:', error);
            setMessage({ type: 'error', text: 'Greška pri postavljanju glavne slike' });
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm p-6"
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

            {/* Forma za dodavanje novog proizvoda */}
            <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <h3 className="text-lg font-medium text-gray-900 mb-6">Dodaj novi proizvod</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                <span className="flex items-center gap-2">
                                    <PhotoIcon className="w-4 h-4" />
                                    Slike proizvoda
                                </span>
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {previewImages.map((preview, index) => (
                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                                        <img
                                            src={preview}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-lg text-gray-600 hover:text-red-600 transition-colors"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                <div
                                    onClick={() => document.getElementById('productImages').click()}
                                    className="aspect-square rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex flex-col items-center">
                                        <PhotoIcon className="w-8 h-8 text-gray-400" />
                                        <p className="text-gray-500 text-xs mt-2">Dodaj sliku</p>
                                    </div>
                                    <input
                                        id="productImages"
                                        type="file"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                        className="hidden"
                                        multiple
                                        onClick={(e) => e.stopPropagation()}
                                    />
                                </div>
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
                    <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg text-white bg-[#C72C41] hover:bg-[#a42435] transition-all duration-200 shadow-sm hover:shadow"
                    >
                        <PlusIcon className="w-5 h-5 mr-2" />
                        Dodaj proizvod
                    </button>
                </form>
            </div>

            {/* Lista postojećih proizvoda */}
            <div className="mt-12">
                <div className="border-b border-gray-100 mb-6">
                    <h3 className="text-lg font-medium text-gray-900 pb-4">
                        Postojeći proizvodi
                    </h3>
                </div>
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
                                    src={product.images && product.images.length > 0 
                                        ? `${import.meta.env.VITE_API_URL}/storage/${product.images[0].image_path}`
                                        : 'https://via.placeholder.com/300x300?text=Nema+slike'
                                    }
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
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="p-1 text-gray-400 hover:text-[#C72C41] transition-colors"
                                        >
                                            <PencilIcon className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </div>
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
                                {product.images && product.images.length > 1 && (
                                    <div className="mt-3 flex items-center text-xs text-gray-500">
                                        <PhotoIcon className="w-4 h-4 mr-1" />
                                        {product.images.length} slika
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal za izmenu proizvoda */}
            <AnimatePresence>
                {isEditModalOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            onClick={() => setIsEditModalOpen(false)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-xl shadow-xl z-50 overflow-hidden"
                        >
                            <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Izmeni proizvod</h3>
                                <button
                                    onClick={() => setIsEditModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-500 transition-colors"
                                >
                                    <XMarkIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="p-6">
                                <form onSubmit={handleEditSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                <span className="flex items-center gap-2">
                                                    <PhotoIcon className="w-4 h-4" />
                                                    Slike proizvoda
                                                </span>
                                            </label>
                                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                                {editedProduct.images.map((image, index) => (
                                                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                                                        <img
                                                            src={`${import.meta.env.VITE_API_URL}/storage/${image.image_path}`}
                                                            alt={`Product ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.src = 'https://via.placeholder.com/300x300?text=Nema+slike';
                                                            }}
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeEditImage(index, true)}
                                                            className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-lg text-gray-600 hover:text-red-600 transition-colors"
                                                        >
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSetPrimaryImage(image.id)}
                                                            className={`absolute bottom-2 right-2 p-1.5 rounded-lg transition-colors ${
                                                                image.is_primary 
                                                                    ? 'bg-green-500 text-white' 
                                                                    : 'bg-white/80 text-gray-600 hover:text-green-600'
                                                            }`}
                                                        >
                                                            <StarIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                                {editPreviewImages.map((preview, index) => (
                                                    <div key={`new-${index}`} className="relative aspect-square rounded-lg overflow-hidden bg-gray-50 border border-gray-200">
                                                        <img
                                                            src={preview}
                                                            alt={`New Preview ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => removeEditImage(editedProduct.images.length + index)}
                                                            className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-lg text-gray-600 hover:text-red-600 transition-colors"
                                                        >
                                                            <TrashIcon className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ))}
                                                <div
                                                    onClick={() => document.getElementById('editProductImages').click()}
                                                    className="aspect-square rounded-lg bg-gray-50 border border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors"
                                                >
                                                    <div className="flex flex-col items-center">
                                                        <PhotoIcon className="w-8 h-8 text-gray-400" />
                                                        <p className="text-gray-500 text-xs mt-2">Dodaj sliku</p>
                                                    </div>
                                                    <input
                                                        id="editProductImages"
                                                        type="file"
                                                        onChange={handleEditImageChange}
                                                        accept="image/*"
                                                        className="hidden"
                                                        multiple
                                                        onClick={(e) => e.stopPropagation()}
                                                    />
                                                </div>
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
                                                value={editedProduct.name}
                                                onChange={(e) => setEditedProduct(prev => ({ ...prev, name: e.target.value }))}
                                                className="w-full rounded-lg border-gray-200 shadow-sm focus:border-[#C72C41] focus:ring-[#C72C41] text-sm"
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
                                                    value={editedProduct.price}
                                                    onChange={(e) => setEditedProduct(prev => ({ ...prev, price: e.target.value }))}
                                                    className="w-full rounded-lg border-gray-200 pr-12 focus:border-[#C72C41] focus:ring-[#C72C41] text-sm"
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
                                                value={editedProduct.gender}
                                                onChange={(e) => setEditedProduct(prev => ({ ...prev, gender: e.target.value }))}
                                                className="w-full rounded-lg border-gray-200 shadow-sm focus:border-[#C72C41] focus:ring-[#C72C41] text-sm"
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
                                                {editedProduct.colors.map((color, index) => (
                                                    <div key={index} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            value={color}
                                                            onChange={(e) => handleEditColorChange(index, e.target.value)}
                                                            className="flex-1 rounded-lg border-gray-200 shadow-sm focus:border-[#C72C41] focus:ring-[#C72C41] text-sm"
                                                            placeholder="Unesite boju"
                                                            required
                                                        />
                                                        {index > 0 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeEditColorField(index)}
                                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                            >
                                                                <TrashIcon className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={addEditColorField}
                                                    className="inline-flex items-center px-3 py-1.5 text-sm text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                                                >
                                                    <PlusIcon className="w-4 h-4 mr-1" />
                                                    Dodaj boju
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditModalOpen(false)}
                                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            Odustani
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg text-white bg-[#C72C41] hover:bg-[#a42435] transition-all duration-200 shadow-sm hover:shadow disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {loading ? 'Čuvanje...' : 'Sačuvaj izmene'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default ProductManager; 