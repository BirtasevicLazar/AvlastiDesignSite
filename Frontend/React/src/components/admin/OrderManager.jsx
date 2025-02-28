import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axiosInstance from '../../utils/axios';
import { 
    ShoppingBagIcon, 
    ClockIcon, 
    CheckCircleIcon, 
    XCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    BuildingOfficeIcon,
    UserIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const statusConfig = {
    pending: {
        label: 'Na čekanju',
        icon: ClockIcon,
        bgColor: 'bg-yellow-50',
        textColor: 'text-yellow-700',
        borderColor: 'border-yellow-200'
    },
    completed: {
        label: 'Završeno',
        icon: CheckCircleIcon,
        bgColor: 'bg-green-50',
        textColor: 'text-green-700',
        borderColor: 'border-green-200'
    },
    cancelled: {
        label: 'Otkazano',
        icon: XCircleIcon,
        bgColor: 'bg-red-50',
        textColor: 'text-red-700',
        borderColor: 'border-red-200'
    }
};

const OrderManager = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [expandedOrder, setExpandedOrder] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(null);
    const [updatingStatus, setUpdatingStatus] = useState(false);
    const [statusChangeError, setStatusChangeError] = useState(null);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/orders');
            setOrders(response.data.orders);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
            setError('Greška pri učitavanju porudžbina');
            setLoading(false);
        }
    };

    const handleStatusChange = async (orderId, newStatus) => {
        setShowConfirmation({
            orderId,
            newStatus,
            currentStatus: orders.find(o => o.id === orderId).status
        });
    };

    const confirmStatusChange = async () => {
        if (!showConfirmation) return;

        setUpdatingStatus(true);
        setStatusChangeError(null);

        try {
            await axiosInstance.patch(`/api/admin/orders/${showConfirmation.orderId}/status`, {
                status: showConfirmation.newStatus
            });

            // Ažuriranje lokalnog stanja
            setOrders(orders.map(order => 
                order.id === showConfirmation.orderId 
                    ? { ...order, status: showConfirmation.newStatus }
                    : order
            ));

            setShowConfirmation(null);
        } catch (error) {
            console.error('Error updating order status:', error);
            setStatusChangeError('Greška pri promeni statusa porudžbine');
        } finally {
            setUpdatingStatus(false);
        }
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-sm px-6 py-8">
                <div className="animate-pulse space-y-8">
                    <div className="h-8 bg-gray-100 rounded-lg w-1/4"></div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-gray-50 rounded-xl p-6 space-y-4">
                                <div className="h-6 bg-gray-100 rounded w-1/3"></div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-4 bg-gray-100 rounded"></div>
                                    <div className="h-4 bg-gray-100 rounded"></div>
                                    <div className="h-4 bg-gray-100 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white rounded-2xl shadow-sm p-6">
                <div className="text-center">
                    <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Greška pri učitavanju</h3>
                    <p className="mt-1 text-sm text-gray-500">{error}</p>
                    <div className="mt-6">
                        <button
                            onClick={fetchOrders}
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Pokušaj ponovo
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-sm px-6 py-8"
        >
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Porudžbine</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Upravljajte i pratite sve porudžbine na jednom mestu.
                </p>
            </div>

            <div className="space-y-4">
                <AnimatePresence>
                    {orders.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-12"
                        >
                            <ShoppingBagIcon className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">Nema porudžbina</h3>
                            <p className="mt-1 text-sm text-gray-500">Još uvek nema aktivnih porudžbina.</p>
                        </motion.div>
                    ) : (
                        orders.map((order) => {
                            const status = statusConfig[order.status];
                            const StatusIcon = status.icon;
                            const isExpanded = expandedOrder === order.id;

                            return (
                                <motion.div
                                    key={order.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className={`border rounded-xl overflow-hidden transition-all duration-200 ${isExpanded ? 'shadow-md' : 'shadow-sm'}`}
                                >
                                    {/* Header sa osnovnim informacijama */}
                                    <div
                                        onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                                        className={`px-4 sm:px-6 py-4 cursor-pointer transition-colors hover:bg-gray-50 ${isExpanded ? 'bg-gray-50' : 'bg-white'}`}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => {
                                                        e.stopPropagation();
                                                        handleStatusChange(order.id, e.target.value);
                                                    }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    className={`flex items-center px-3 py-1 rounded-full ${statusConfig[order.status].bgColor} ${statusConfig[order.status].textColor} text-sm font-medium border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                                >
                                                    {Object.entries(statusConfig).map(([value, config]) => (
                                                        <option key={value} value={value}>
                                                            {config.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="text-sm font-medium text-gray-900">
                                                    Porudžbina #{order.id}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between sm:justify-end gap-4">
                                                <span className="text-sm text-gray-500">
                                                    {new Date(order.created_at).toLocaleDateString('sr-RS')}
                                                </span>
                                                {isExpanded ? (
                                                    <ChevronUpIcon className="w-5 h-5 text-gray-400" />
                                                ) : (
                                                    <ChevronDownIcon className="w-5 h-5 text-gray-400" />
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Detalji porudžbine */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="border-t border-gray-100"
                                            >
                                                <div className="px-4 sm:px-6 py-4 space-y-6">
                                                    {/* Informacije o kupcu i dostavi */}
                                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                                        {/* Informacije o kupcu */}
                                                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                                            <h4 className="text-sm font-medium text-gray-900">Podaci o kupcu</h4>
                                                            <div className="space-y-3">
                                                                <div className="flex items-center text-sm text-gray-600">
                                                                    <UserIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                                                    <span className="break-all">{order.first_name} {order.last_name}</span>
                                                                </div>
                                                                <div className="flex items-center text-sm text-gray-600">
                                                                    <EnvelopeIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                                                    <span className="break-all">{order.email}</span>
                                                                </div>
                                                                <div className="flex items-center text-sm text-gray-600">
                                                                    <PhoneIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                                                    <span>{order.phone}</span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Adresa za dostavu */}
                                                        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                                                            <h4 className="text-sm font-medium text-gray-900">Adresa za dostavu</h4>
                                                            <div className="space-y-3">
                                                                <div className="flex items-start text-sm text-gray-600">
                                                                    <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
                                                                    <span className="break-words">
                                                                        {order.street} {order.house_number}
                                                                        {order.floor && `, Sprat ${order.floor}`}
                                                                        {order.apartment && `, Stan ${order.apartment}`}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center text-sm text-gray-600">
                                                                    <BuildingOfficeIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                                                                    <span>{order.postal_code} {order.city}, {order.country}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Lista proizvoda */}
                                                    <div className="space-y-4">
                                                        <h4 className="text-sm font-medium text-gray-900">Proizvodi</h4>
                                                        <div className="bg-gray-50 rounded-lg divide-y divide-gray-100">
                                                            {order.items.map((item) => (
                                                                <div key={item.id} className="p-4">
                                                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                                                        <div className="flex items-center gap-4">
                                                                            <img
                                                                                src={`${import.meta.env.VITE_API_URL}/storage/${item.product.image}`}
                                                                                alt={item.product.name}
                                                                                className="w-16 h-16 object-cover rounded-lg"
                                                                            />
                                                                            <div>
                                                                                <p className="text-sm font-medium text-gray-900">{item.product.name}</p>
                                                                                <p className="text-sm text-gray-500 mt-1">
                                                                                    Veličina: {item.size}
                                                                                    {item.color && `, Boja: ${item.color}`}
                                                                                </p>
                                                                                <p className="text-sm text-gray-500">
                                                                                    {item.product.gender === 'male' ? 'Muška majica' :
                                                                                     item.product.gender === 'female' ? 'Ženska majica' : 'Unisex majica'}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="flex justify-between items-center sm:ml-auto gap-4">
                                                                            <div className="text-sm text-gray-500">
                                                                                Količina: {item.quantity}
                                                                            </div>
                                                                            <div className="text-sm font-medium text-gray-900">
                                                                                {item.price} RSD
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    {/* Ukupno i napomena */}
                                                    <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
                                                        {order.note && (
                                                            <div className="bg-yellow-50 rounded-lg p-4 text-sm text-yellow-700">
                                                                <p className="font-medium mb-1">Napomena:</p>
                                                                <p>{order.note}</p>
                                                            </div>
                                                        )}
                                                        <div className="bg-gray-50 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                                                            <span className="text-sm text-gray-500">Ukupno za plaćanje:</span>
                                                            <span className="text-lg font-bold text-gray-900">{order.total_amount} RSD</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })
                    )}
                </AnimatePresence>
            </div>
            
            {/* Modal za potvrdu promene statusa */}
            <AnimatePresence>
                {showConfirmation && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                            onClick={() => setShowConfirmation(null)}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-xl z-50 p-6"
                        >
                            <div className="flex items-center space-x-3 text-yellow-600 mb-4">
                                <ExclamationTriangleIcon className="h-6 w-6" />
                                <h3 className="text-lg font-medium">Potvrda promene statusa</h3>
                            </div>
                            
                            <p className="text-gray-600 mb-6">
                                Da li ste sigurni da želite da promenite status porudžbine #{showConfirmation?.orderId} iz{' '}
                                <span className="font-medium">{statusConfig[showConfirmation?.currentStatus]?.label}</span> u{' '}
                                <span className="font-medium">{statusConfig[showConfirmation?.newStatus]?.label}</span>?
                            </p>

                            {statusChangeError && (
                                <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">
                                    {statusChangeError}
                                </div>
                            )}

                            <div className="flex justify-end space-x-3">
                                <button
                                    onClick={() => setShowConfirmation(null)}
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                                >
                                    Otkaži
                                </button>
                                <button
                                    onClick={confirmStatusChange}
                                    disabled={updatingStatus}
                                    className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center`}
                                >
                                    {updatingStatus ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Menjanje statusa...
                                        </>
                                    ) : (
                                        'Potvrdi promenu'
                                    )}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default OrderManager; 