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
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 relative">
      {/* Dugme za uklanjanje proizvoda */}
      <button
        onClick={() => removeFromCart(item)}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-500 transition-colors"
      >
        <XMarkIcon className="h-5 w-5" />
      </button>

      <div className="flex flex-col items-center md:flex-row md:items-start">
        {/* Slika proizvoda */}
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-lg mb-4 md:mb-0 md:mr-4"
        />

        {/* Informacije o proizvodu */}
        <div className="flex-grow text-center md:text-left">
          <h3 className="text-lg font-semibold text-gray-900 truncate">
            {item.name}
          </h3>
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

      {/* Kontrole za količinu i cenu */}
      <div className="flex flex-col items-center md:flex-row md:justify-between mt-4">
        <div className="flex items-center space-x-3 mb-4 md:mb-0">
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

        <div className="flex flex-col space-y-2 items-center md:items-end">
          <p className="text-sm text-gray-500">
            Cena po komadu: <span className="font-medium text-gray-900">{item.price} RSD</span>
          </p>
          <p className="text-sm text-gray-500">
            Ukupno: <span className="font-medium text-gray-900">{(item.price * item.quantity).toFixed(2)} RSD</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartItem; 