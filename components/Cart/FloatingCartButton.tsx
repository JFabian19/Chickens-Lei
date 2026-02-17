
import React from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingBag } from 'lucide-react';

export const FloatingCartButton: React.FC = () => {
    const { totalItems, totalPrice, setOpenCart } = useCart();

    if (totalItems === 0) return null;

    return (
        <div className="fixed bottom-6 left-0 right-0 z-40 px-4 flex justify-center animate-in slide-in-from-bottom-10 fade-in duration-300">
            <button
                onClick={() => setOpenCart(true)}
                className="w-full max-w-sm bg-gray-900 text-white shadow-2xl rounded-full p-4 flex items-center justify-between hover:scale-[1.02] active:scale-[0.98] transition-all border border-gray-700/50"
            >
                <div className="flex items-center gap-3">
                    <div className="bg-orange-500 text-white font-bold w-10 h-10 rounded-full flex items-center justify-center shadow-lg transform -translate-y-1">
                        {totalItems}
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">Total</span>
                        <span className="text-xl font-bold">S/ {totalPrice.toFixed(2)}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full font-bold text-sm backdrop-blur-sm">
                    <span>Ver Pedido</span>
                    <ShoppingBag size={18} />
                </div>
            </button>
        </div>
    );
};
