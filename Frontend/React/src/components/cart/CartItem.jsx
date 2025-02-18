import React from 'react';
import { useCart } from '../../context/CartContext';
import { MinusIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Mapiranje naziva boja u srpski
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

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, item.quantity + value));
    updateQuantity(item, newQuantity);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6">
      <div className="flex items-start space-x-4">
        {/* Slika proizvoda */}
        <div className="flex-shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-xl"
          />
        </div>

        {/* Informacije o proizvodu */}
        <div className="flex-grow min-w-0">
          <div className="flex justify-between">
            <div>
              <h3 className="text-lg font-medium text-gray-900 truncate">
                {item.name}
              </h3>
              <div className="mt-1 space-y-1">
                <p className="text-sm text-gray-500">
                  Veličina: <span className="font-medium text-gray-900">{item.size}</span>
                </p>
                {item.color && (
                  <p className="text-sm text-gray-500">
                    Boja: <span className="font-medium text-gray-900">{colorNameMapping[item.color] || item.color}</span>
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item)}
              className="text-gray-400 hover:text-gray-500 transition-colors p-1"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex items-center justify-between">
            {/* Kontrole za količinu */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityChange(-1)}
                disabled={item.quantity <= 1}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MinusIcon className="h-4 w-4" />
              </button>
              <span className="text-gray-900 font-medium min-w-[2rem] text-center">
                {item.quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(1)}
                disabled={item.quantity >= 10}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-gray-200 text-gray-600 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <PlusIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Cena */}
            <div className="text-right">
              <p className="text-sm text-gray-500">Cena po komadu</p>
              <div className="flex flex-col">
                <p className="text-lg font-medium text-gray-900">{item.price} RSD</p>
                <p className="text-sm text-gray-500">
                  Ukupno: <span className="font-medium text-gray-900">{(item.price * item.quantity).toFixed(2)} RSD</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem; 