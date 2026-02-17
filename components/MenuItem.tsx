import React from 'react';
import { MenuItem as MenuItemType } from '../types';
import { PriceStar } from './PriceStar';
import { useCart } from '../context/CartContext';
import { Plus, Minus, ShoppingBag } from 'lucide-react';

interface Props {
  item: MenuItemType;
  index: number;
  categoryName: string;
}

export const MenuItem: React.FC<Props> = ({ item, index, categoryName }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const cartItem = cart.find((i) => i.nombre === item.nombre);
  const quantity = cartItem ? cartItem.quantity : 0;

  return (
    <div className="relative flex flex-col sm:flex-row bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden mb-4 hover:shadow-md transition-shadow">

      {/* Content Section */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div className="mb-2">
          <h3
            className="text-lg leading-tight uppercase mb-1"
            style={{ fontFamily: 'Roboto Condensed', fontWeight: 700, color: '#333' }}
          >
            {item.nombre}
          </h3>

          {item.descripcion && (
            <p className="text-sm text-gray-500 leading-snug font-light line-clamp-2">
              {item.descripcion}
            </p>
          )}
        </div>

        <div className="flex items-end justify-between mt-2">
          <div className="font-bold text-lg text-gray-900">
            {item.precio !== null ? `S/ ${item.precio.toFixed(2)}` : 'Consultar'}
          </div>

          {/* Cart Controls */}
          {item.precio !== null && (
            <div className="flex items-center">
              {quantity === 0 ? (
                <button
                  onClick={() => addToCart(item)}
                  className="bg-orange-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md hover:bg-orange-700 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Plus size={16} />
                  Pedir
                </button>
              ) : (
                <div className="flex items-center bg-gray-100 rounded-full p-1 shadow-inner">
                  <button
                    onClick={() => updateQuantity(item.nombre, quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-700 hover:text-red-500 active:scale-90 transition-all"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.nombre, quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-700 hover:text-green-500 active:scale-90 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};