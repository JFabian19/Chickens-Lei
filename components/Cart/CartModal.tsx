
import React, { useState, useEffect, useMemo } from 'react';
import { useCart } from '../../context/CartContext';
import { MenuItem } from '../../types';
import { Minus, Plus, Trash2, X, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

const SAUCES = [
    'Mayonesa',
    'Ketchup',
    'Mostaza',
    'Huancaína',
    'Golf',
    'Aceituna',
    'Ají',
    'Ajo',
    'Tártara',
    'Tocineta',
    'Ocopa',
];

interface Props {
    onClose: () => void;
    phoneNumber: string;
}

import { useMenu } from '../../context/MenuContext';

export const CartModal: React.FC<Props> = ({ onClose, phoneNumber }) => {
    const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart();
    const { menuData } = useMenu();
    const [step, setStep] = useState<'cart' | 'sauces'>('cart');

    // Helper to check if item is Broaster
    const isBroaster = (itemName: string) => {
        const broasterCategory = menuData.menu.find(c => c.categoria === "Pollo Broaster");
        return broasterCategory?.items.some(i => i.nombre === itemName);
    };

    // Helper to check if item is Soda
    const isSoda = (itemName: string) => {
        const sodaCategory = menuData.menu.find(c => c.categoria === "Gaseosas");
        return sodaCategory?.items.some(i => i.nombre === itemName);
    };

    // Helper to check if item is Burger
    const isBurger = (itemName: string) => {
        const burgerCategories = menuData.menu.filter(c => c.categoria === "Hamburguesas" || c.categoria === "Hamburguesas Especiales");
        return burgerCategories.some(c => c.items.some(i => i.nombre === itemName));
    };

    // Expand cart items into individual instances for configuration
    const expandedCart = useMemo(() => {
        const items: Array<{
            nombre: string;
            precio: number | null;
            quantity: number;
            instanceId: string;
            selectedAdditions?: { name: string; price: number }[];
        }> = [];
        cart.forEach((item) => {
            for (let i = 0; i < item.quantity; i++) {
                items.push({
                    nombre: item.nombre,
                    precio: item.precio,
                    quantity: 1, // Logic is now per unit
                    instanceId: `${item.cartId}-${i}`,
                    selectedAdditions: item.selectedAdditions
                });
            }
        });
        return items;
    }, [cart]);

    // All items are now configurable (Sodas need flavor choice)
    const configurableItems = expandedCart;

    // Track which configurable item we are currently configuring
    const [currentConfigIndex, setCurrentConfigIndex] = useState(0);

    // Map of instanceId -> selected sauces
    const [sauceConfigs, setSauceConfigs] = useState<Record<string, string[]>>({});
    // Map of instanceId -> has salad (true/false)
    const [saladConfigs, setSaladConfigs] = useState<Record<string, boolean>>({});
    // Map of instanceId -> side (Papas/Camotes)
    const [sideConfigs, setSideConfigs] = useState<Record<string, 'Papas' | 'Camote'>>({});
    // Map of instanceId -> burger side (Papas Fritas/Papas al Hilo)
    const [burgerSideConfigs, setBurgerSideConfigs] = useState<Record<string, 'Papas Fritas' | 'Papas al Hilo'>>({});
    // Map of instanceId -> soda flavor (Inka Cola/Coca-Cola)
    const [sodaConfigs, setSodaConfigs] = useState<Record<string, 'Inka Cola' | 'Coca-Cola'>>({});

    useEffect(() => {
        // Initialize configs if missing
        const newSauceConfigs = { ...sauceConfigs };
        const newSaladConfigs = { ...saladConfigs };
        const newSideConfigs = { ...sideConfigs };
        const newBurgerSideConfigs = { ...burgerSideConfigs };
        const newSodaConfigs = { ...sodaConfigs };

        expandedCart.forEach(item => {
            if (!newSauceConfigs[item.instanceId]) {
                newSauceConfigs[item.instanceId] = [];
            }
            if (newSaladConfigs[item.instanceId] === undefined) {
                newSaladConfigs[item.instanceId] = true; // Default to with salad
            }
            if (!newSideConfigs[item.instanceId] && isBroaster(item.nombre)) {
                newSideConfigs[item.instanceId] = 'Papas'; // Default side
            }
            if (!newSodaConfigs[item.instanceId] && isSoda(item.nombre)) {
                newSodaConfigs[item.instanceId] = 'Inka Cola'; // Default flavor
            }
            if (!newBurgerSideConfigs[item.instanceId] && isBurger(item.nombre)) {
                newBurgerSideConfigs[item.instanceId] = 'Papas Fritas'; // Default burger side
            }
        });

        setSauceConfigs(newSauceConfigs);
        setSaladConfigs(newSaladConfigs);
        setSideConfigs(newSideConfigs);
        setBurgerSideConfigs(newBurgerSideConfigs);
        setSodaConfigs(newSodaConfigs);
    }, [expandedCart.length]); // Re-run if total item count changes

    if (cart.length === 0) {
        onClose();
        return null;
    }

    const currentItem = configurableItems[currentConfigIndex];

    const handleSelectAllSauces = () => {
        if (!currentItem) return;
        setSauceConfigs(prev => ({
            ...prev,
            [currentItem.instanceId]: [...SAUCES]
        }));
    };

    const handleDeselectAllSauces = () => {
        if (!currentItem) return;
        setSauceConfigs(prev => ({
            ...prev,
            [currentItem.instanceId]: []
        }));
    };

    const toggleSauce = (sauce: string) => {
        if (!currentItem) return;
        const currentSauces = sauceConfigs[currentItem.instanceId] || [];

        let newSauces;
        if (currentSauces.includes(sauce)) {
            newSauces = currentSauces.filter((s) => s !== sauce);
        } else {
            newSauces = [...currentSauces, sauce];
        }

        setSauceConfigs(prev => ({
            ...prev,
            [currentItem.instanceId]: newSauces
        }));
    };

    const toggleSalad = (hasSalad: boolean) => {
        if (!currentItem) return;
        setSaladConfigs(prev => ({
            ...prev,
            [currentItem.instanceId]: hasSalad
        }));
    };

    const toggleSide = (side: 'Papas' | 'Camote') => {
        if (!currentItem) return;
        setSideConfigs(prev => ({
            ...prev,
            [currentItem.instanceId]: side
        }));
    };

    const toggleSodaFlavor = (flavor: 'Inka Cola' | 'Coca-Cola') => {
        if (!currentItem) return;
        setSodaConfigs(prev => ({
            ...prev,
            [currentItem.instanceId]: flavor
        }));
    };

    const toggleBurgerSide = (side: 'Papas Fritas' | 'Papas al Hilo') => {
        if (!currentItem) return;
        setBurgerSideConfigs(prev => ({
            ...prev,
            [currentItem.instanceId]: side
        }));
    };

    const handleNext = () => {
        if (currentConfigIndex < configurableItems.length - 1) {
            setCurrentConfigIndex(prev => prev + 1);
        } else {
            handleSendOrder();
        }
    };

    const handleBack = () => {
        if (currentConfigIndex > 0) {
            setCurrentConfigIndex(prev => prev - 1);
        } else {
            setStep('cart');
        }
    };

    const handleSendOrder = () => {
        let message = `*Hola, deseo realizar el siguiente pedido:*\n\n`;

        expandedCart.forEach((item) => {
            message += `*1 x ${item.nombre}*\n`;
            if (item.selectedAdditions && item.selectedAdditions.length > 0) {
                const adds = item.selectedAdditions.map(a => a.name).join(', ');
                message += `   Adicionales: ${adds}\n`;
            }

            if (isSoda(item.nombre)) {
                // Soda Config
                const flavor = sodaConfigs[item.instanceId] || 'Inka Cola';
                message += `   Sabor: ${flavor}\n`;
            } else {
                // Food Config specific logic

                // Side config (only for Broaster)
                if (isBroaster(item.nombre)) {
                    const side = sideConfigs[item.instanceId] || 'Papas';
                    message += `   Guarnición: ${side}\n`;
                }

                // Burger Side config
                if (isBurger(item.nombre)) {
                    const side = burgerSideConfigs[item.instanceId] || 'Papas Fritas';
                    message += `   Papas: ${side}\n`;
                }

                // Salad config
                const hasSalad = saladConfigs[item.instanceId];
                message += `   Ensalada: ${hasSalad ? 'Sí' : 'No'}\n`;

                // Sauce config
                const config = sauceConfigs[item.instanceId] || [];
                if (config.length === 0) {
                    message += `   Cremas: Ninguna\n`;
                } else if (config.length === SAUCES.length) {
                    message += `   Cremas: Todas\n`;
                } else {
                    message += `   Cremas: ${config.join(', ')}\n`;
                }
            }
            message += `\n`;
        });

        message += `*Total a Pagar: S/ ${totalPrice.toFixed(2)}*\n\n`;
        message += `*Por favor confirmar mi pedido*`;

        const whatsappUrl = `https://wa.me/51${phoneNumber.replace(/\s+/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        clearCart();
        onClose();
    };

    const startSauceConfiguration = () => {
        if (configurableItems.length === 0) {
            handleSendOrder();
        } else {
            setCurrentConfigIndex(0);
            setStep('sauces');
        }
    };

    const currentSelections = currentItem ? (sauceConfigs[currentItem.instanceId] || []) : [];
    const currentSalad = currentItem ? (saladConfigs[currentItem.instanceId] !== false) : true;
    const currentSide = currentItem ? (sideConfigs[currentItem.instanceId] || 'Papas') : 'Papas';
    const currentBurgerSide = currentItem ? (burgerSideConfigs[currentItem.instanceId] || 'Papas Fritas') : 'Papas Fritas';
    const currentSodaFlavor = currentItem ? (sodaConfigs[currentItem.instanceId] || 'Inka Cola') : 'Inka Cola';

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">

                {/* Header */}
                <div className="px-6 py-4 bg-orange-600 text-white flex justify-between items-center shadow-md z-10 transition-colors duration-300">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        {step === 'cart' ? (
                            <>🛒 Tu Pedido</>
                        ) : (
                            <>🌶️ Configuración ({currentConfigIndex + 1}/{configurableItems.length})</>
                        )}
                    </h2>
                    <button onClick={onClose} className="p-1 hover:bg-white/20 rounded-full transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    {step === 'cart' ? (
                        <div className="space-y-4">
                            {cart.map((item) => {
                                const additionsTotal = item.selectedAdditions?.reduce((sum, add) => sum + add.price, 0) || 0;
                                const unitPrice = (item.precio || 0) + additionsTotal;
                                return (
                                    <div key={item.cartId} className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                        <div className="flex-1 pr-4">
                                            <h3 className="font-bold text-gray-800 text-lg leading-tight">{item.nombre}</h3>
                                            {item.selectedAdditions && item.selectedAdditions.length > 0 && (
                                                <p className="text-xs text-gray-500 italic mb-1">
                                                    + {item.selectedAdditions.map(a => a.name).join(', ')}
                                                </p>
                                            )}
                                            <p className="text-sm text-gray-500 font-medium">S/ {unitPrice.toFixed(2)}</p>
                                        </div>

                                        <div className="flex items-center gap-3 bg-gray-100 rounded-lg p-1">
                                            <button
                                                onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                                                className="p-2 hover:bg-white text-gray-600 rounded-lg transition-all shadow-sm disabled:opacity-50"
                                                disabled={item.quantity <= 0}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-6 text-center font-bold text-gray-800 text-lg">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                                                className="p-2 hover:bg-white text-gray-600 rounded-lg transition-all shadow-sm"
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="space-y-6 animate-in slide-in-from-right-8 duration-300">
                            {/* Item Info Header */}
                            <div className="text-center mb-6">
                                <span className="text-sm font-bold text-orange-600 uppercase tracking-widest">Configurando:</span>
                                <h3 className="text-2xl font-black text-gray-800 mt-1 leading-tight">
                                    {currentItem?.nombre}
                                </h3>
                                {/* Show which number this is (e.g., #1 of 2) */}
                                {configurableItems.filter(i => i.nombre === currentItem?.nombre).length > 1 && (
                                    <p className="text-gray-500 text-sm mt-1">
                                        Unidad #{configurableItems.filter((item, idx) => item.nombre === currentItem.nombre && idx <= currentConfigIndex).length}
                                    </p>
                                )}
                            </div>

                            {/* CONFIGURATION CONTENT - CONDITIONAL RENDERING */}
                            {currentItem && isSoda(currentItem.nombre) ? (
                                /* SODA CONFIGURATION */
                                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-2">
                                    <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                        🥤 Sabor
                                    </h4>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleSodaFlavor('Inka Cola')}
                                            className={`flex-1 py-4 px-4 rounded-lg font-bold text-sm transition-all border-2 flex flex-col items-center gap-2 ${currentSodaFlavor === 'Inka Cola'
                                                ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                                                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="w-6 h-6 rounded-full bg-yellow-400 border-2 border-yellow-600"></div>
                                            Inka Cola
                                        </button>
                                        <button
                                            onClick={() => toggleSodaFlavor('Coca-Cola')}
                                            className={`flex-1 py-4 px-4 rounded-lg font-bold text-sm transition-all border-2 flex flex-col items-center gap-2 ${currentSodaFlavor === 'Coca-Cola'
                                                ? 'border-red-500 bg-red-50 text-red-700'
                                                : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className="w-6 h-6 rounded-full bg-red-600 border-2 border-red-800"></div>
                                            Coca-Cola
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* FOOD CONFIGURATION (Sides, Salad, Sauces) */
                                <>
                                    {/* Side Toggle (Only for Broaster) */}
                                    {currentItem && isBroaster(currentItem.nombre) && (
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-2">
                                            <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                                🍟 Guarnición
                                            </h4>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => toggleSide('Papas')}
                                                    className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all border-2 ${currentSide === 'Papas'
                                                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Papas Fritas
                                                </button>
                                                <button
                                                    onClick={() => toggleSide('Camote')}
                                                    className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all border-2 ${currentSide === 'Camote'
                                                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Camote Frito
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Burger Side Toggle */}
                                    {currentItem && isBurger(currentItem.nombre) && (
                                        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-2">
                                            <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                                🍟 Tipo de Papas
                                            </h4>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => toggleBurgerSide('Papas Fritas')}
                                                    className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all border-2 ${currentBurgerSide === 'Papas Fritas'
                                                        ? 'border-yellow-500 bg-yellow-50 text-yellow-700'
                                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Papas Fritas
                                                </button>
                                                <button
                                                    onClick={() => toggleBurgerSide('Papas al Hilo')}
                                                    className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all border-2 ${currentBurgerSide === 'Papas al Hilo'
                                                        ? 'border-orange-500 bg-orange-50 text-orange-700'
                                                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                                        }`}
                                                >
                                                    Papas al Hilo
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Salad Toggle */}
                                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-2">
                                        <h4 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                                            🥗 Ensalada
                                        </h4>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => toggleSalad(true)}
                                                className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all border-2 ${currentSalad
                                                    ? 'border-green-500 bg-green-50 text-green-700'
                                                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                Con Ensalada
                                            </button>
                                            <button
                                                onClick={() => toggleSalad(false)}
                                                className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all border-2 ${!currentSalad
                                                    ? 'border-red-500 bg-red-50 text-red-700'
                                                    : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                                                    }`}
                                            >
                                                Sin Ensalada
                                            </button>
                                        </div>
                                    </div>

                                    <hr className="border-gray-200" />

                                    {/* Sauces Header */}
                                    <div className="flex justify-between items-center">
                                        <h4 className="font-bold text-gray-700 flex items-center gap-2">
                                            🧴 Cremas
                                        </h4>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={handleSelectAllSauces}
                                                className="text-xs font-bold uppercase text-green-600 hover:bg-green-50 px-2 py-1 rounded"
                                            >
                                                Todas
                                            </button>
                                            <button
                                                onClick={handleDeselectAllSauces}
                                                className="text-xs font-bold uppercase text-red-600 hover:bg-red-50 px-2 py-1 rounded"
                                            >
                                                Ninguna
                                            </button>
                                        </div>
                                    </div>

                                    {/* Sauces Grid */}
                                    <div className="grid grid-cols-2 gap-3">
                                        {SAUCES.map((sauce) => (
                                            <div
                                                key={sauce}
                                                onClick={() => toggleSauce(sauce)}
                                                className={`flex items-center p-3 rounded-xl border-2 cursor-pointer transition-all ${currentSelections.includes(sauce)
                                                    ? 'border-orange-500 bg-orange-50 text-orange-700 shadow-md transform scale-[1.02]'
                                                    : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
                                                    }`}
                                            >
                                                <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${currentSelections.includes(sauce) ? 'bg-orange-500 border-orange-500' : 'border-gray-300 bg-white'
                                                    }`}>
                                                    {currentSelections.includes(sauce) && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                                                </div>
                                                <span className="font-bold text-sm tracking-wide">{sauce}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
                    {step === 'cart' ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-500 font-medium text-lg">Total a Pagar</span>
                                <span className="text-3xl font-black text-gray-900 tracking-tight">S/ {totalPrice.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={startSauceConfiguration}
                                className="w-full py-4 bg-gray-900 text-white font-bold rounded-xl shadow-lg hover:bg-gray-800 active:scale-[0.98] transition-all text-lg flex items-center justify-center gap-2"
                            >
                                <span>{configurableItems.length > 0 ? "Configurar Pedido" : "Enviar Pedido"}</span>
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-3">
                            <button
                                onClick={handleBack}
                                className="px-6 py-4 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                            >
                                <ArrowLeft size={24} />
                            </button>

                            <button
                                onClick={handleNext}
                                className={`flex-1 py-4 font-bold rounded-xl shadow-lg active:scale-[0.98] transition-all text-lg flex items-center justify-center gap-2 ${currentConfigIndex < configurableItems.length - 1
                                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                            >
                                {currentConfigIndex < configurableItems.length - 1 ? (
                                    <>
                                        <span>Siguiente</span>
                                        <ArrowRight size={20} />
                                    </>
                                ) : (
                                    <>
                                        <span>Enviar Pedido</span>
                                        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white/90">
                                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
