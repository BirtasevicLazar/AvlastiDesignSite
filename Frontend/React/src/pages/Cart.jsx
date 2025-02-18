import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBagIcon, ArrowLeftIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';

const Cart = () => {
  const { cart, total } = useCart();
  const finalTotal = Number(total).toFixed(2);

  // Helper funkcija za pravilno prikazivanje množine
  const getProductText = (count) => {
    if (count === 1) return '1 proizvod';
    return `${count} proizvoda`;
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pt-28 pb-12 px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
            <div className="w-16 h-16 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <ShoppingBagIcon className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Vaša korpa je prazna
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Izgleda da još niste dodali proizvode u korpu. Pregledajte našu kolekciju i pronađite nešto za sebe.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-6 py-3 text-base font-medium rounded-xl text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-200"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Pregledaj proizvode
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Leva strana - Lista proizvoda */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Korpa <span className="text-gray-500 text-lg">({getProductText(cart.length)})</span>
              </h1>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {cart.map((item, index) => (
                <motion.div
                  key={`${item.id}-${item.size}-${item.color || 'no-color'}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CartItem item={item} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Desna strana - Pregled korpe i plaćanje */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-28">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Pregled porudžbine ({getProductText(cart.length)})
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Međuzbir:</span>
                  <span>{total.toFixed(2)} RSD</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Dostava (plaćanje pouzećem):</span>
                  <span>Plaća se kuriru</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Ukupno za plaćanje:</span>
                    <span>{finalTotal} RSD + dostava</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-gray-900 hover:bg-gray-800"
                  >
                    Nastavi na plaćanje
                  </Link>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <div className="flex items-center justify-center">
                  <TruckIcon className="h-5 w-5 mr-2" />
                  Plaćanje pouzećem prilikom isporuke
                </div>
              </div>

              {/* Dodatne informacije */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <ShieldCheckIcon className="w-5 h-5 mr-2 text-gray-400" />
                    Sigurno plaćanje i zaštita podataka
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart; 