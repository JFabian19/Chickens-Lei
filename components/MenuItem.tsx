import React, { useState } from 'react';
import { MenuItem as MenuItemType, Addition } from '../types';
import { PriceStar } from './PriceStar';
import { useCart } from '../context/CartContext';
import { Plus, Minus, ShoppingBag, X, Check } from 'lucide-react';

interface Props {
  item: MenuItemType;
  index: number;
  categoryName: string;
  availableAdditions?: Addition[];
}

export const MenuItem: React.FC<Props> = ({ item, index, categoryName, availableAdditions }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAdditions, setSelectedAdditions] = useState<Addition[]>([]);

  // For non-customizable items, we can use exact matching
  const hasAdditions = availableAdditions && availableAdditions.length > 0;

  // Find cart item for non-customizable items (simple quantity control)
  const simpleCartItem = !hasAdditions ? cart.find(i => i.nombre === item.nombre) : null;
  const quantity = simpleCartItem ? simpleCartItem.quantity : 0;

  // For customizable items, show total count of this base item across all variations
  const totalQuantityVariant = hasAdditions ? cart.filter(i => i.nombre === item.nombre).reduce((acc, i) => acc + i.quantity, 0) : 0;

  const handleOpenModal = () => {
    setSelectedAdditions([]);
    setIsModalOpen(true);
  };

  const handleConfirmAdd = () => {
    addToCart(item, selectedAdditions);
    setIsModalOpen(false);
  };

  const toggleAddition = (addition: Addition) => {
    if (selectedAdditions.find(a => a.name === addition.name)) {
      setSelectedAdditions(prev => prev.filter(a => a.name !== addition.name));
    } else {
      setSelectedAdditions(prev => [...prev, addition]);
    }
  };

  const currentPrice = (item.precio || 0) + selectedAdditions.reduce((sum, a) => sum + a.price, 0);

  return (
    <>
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

            {hasAdditions && totalQuantityVariant > 0 && (
              <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-1 rounded-full inline-block mt-1">
                {totalQuantityVariant} en carrito
              </span>
            )}
          </div>

          <div className="flex items-end justify-between mt-2">
            <div className="font-bold text-lg text-gray-900">
              {item.precio !== null ? `S/ ${item.precio.toFixed(2)}` : 'Consultar'}
            </div>

            {/* Cart Controls */}
            {item.precio !== null && (
              <div className="flex items-center">
                {hasAdditions ? (
                  <button
                    onClick={handleOpenModal}
                    className="bg-stone-800 text-white px-4 py-2 rounded-full font-bold text-xs shadow-md hover:bg-stone-900 active:scale-95 transition-all flex items-center gap-2"
                  >
                    <Plus size={14} />
                    {totalQuantityVariant > 0 ? 'Agregar Otro' : 'Pedir'}
                  </button>
                ) : (
                  quantity === 0 ? (
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
                        onClick={() => simpleCartItem && updateQuantity(simpleCartItem.cartId, quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-700 hover:text-red-500 active:scale-90 transition-all"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-900">{quantity}</span>
                      <button
                        onClick={() => simpleCartItem && updateQuantity(simpleCartItem.cartId, quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-sm text-gray-700 hover:text-green-500 active:scale-90 transition-all"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Additions Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 sm:p-6">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)} />

          <div className="bg-white w-full max-w-sm rounded-t-2xl sm:rounded-2xl shadow-2xl z-50 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-stone-50">
              <div>
                <h3 className="font-bold text-lg text-stone-800">{item.nombre}</h3>
                <p className="text-sm text-stone-500">Personaliza tu pedido</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-full hover:bg-stone-200 text-stone-500">
                <X size={20} />
              </button>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              <p className="font-medium text-sm text-stone-600 mb-3 uppercase tracking-wider">Adiciones Disponibles</p>
              <div className="space-y-2">
                {availableAdditions?.map((add, idx) => {
                  const isSelected = !!selectedAdditions.find(a => a.name === add.name);
                  return (
                    <label key={idx} className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${isSelected ? 'border-orange-500 bg-orange-50' : 'border-stone-100 hover:border-stone-200'}`}>
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center ${isSelected ? 'bg-orange-500 border-orange-500' : 'border-stone-300 bg-white'}`}>
                          {isSelected && <Check size={12} className="text-white" />}
                        </div>
                        <span className="font-medium text-stone-700">{add.name}</span>
                      </div>
                      <span className="font-bold text-stone-900">+ S/ {add.price.toFixed(2)}</span>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => toggleAddition(add)}
                      />
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="p-4 border-t border-stone-100 bg-stone-50">
              <button
                onClick={handleConfirmAdd}
                className="w-full bg-stone-900 text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-stone-800 active:scale-95 transition-all flex justify-between items-center px-6"
              >
                <span>Agregar al pedido</span>
                <span>S/ {currentPrice.toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};