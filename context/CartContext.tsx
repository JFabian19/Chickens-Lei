import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '../types';

export interface CartItem extends MenuItem {
    quantity: number;
    selectedAdditions?: { name: string; price: number }[];
    cartId: string; // Unique ID for cart item management
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: MenuItem, additions?: { name: string; price: number }[]) => void;
    removeFromCart: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    openCart: boolean;
    setOpenCart: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [openCart, setOpenCart] = useState(false);

    // Load cart from localStorage on mount (optional but good UX)
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage on change
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (item: MenuItem, additions: { name: string; price: number }[] = []) => {
        setCart((prevCart) => {
            // Find if item with same name AND same additions exists
            // Since additions order might not matter, sorting helps, but for now simple length & name check
            // For simplicity, let's treat every "customized" item as unique unless identical deeply.

            const additionsKey = JSON.stringify(additions.sort((a, b) => a.name.localeCompare(b.name)));

            const existingItemIndex = prevCart.findIndex(
                (i) => i.nombre === item.nombre &&
                    JSON.stringify((i.selectedAdditions || []).sort((a, b) => a.name.localeCompare(b.name))) === additionsKey
            );

            if (existingItemIndex > -1) {
                const updatedCart = [...prevCart];
                updatedCart[existingItemIndex].quantity += 1;
                return updatedCart;
            }

            return [...prevCart, {
                ...item,
                quantity: 1,
                selectedAdditions: additions,
                cartId: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
            }];
        });
    };

    const removeFromCart = (cartId: string) => {
        setCart((prevCart) => prevCart.filter((item) => item.cartId !== cartId));
    };

    const updateQuantity = (cartId: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(cartId);
            return;
        }
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.cartId === cartId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = cart.reduce((acc, item) => {
        const itemTotal = (item.precio || 0) + (item.selectedAdditions?.reduce((sum, add) => sum + add.price, 0) || 0);
        return acc + itemTotal * item.quantity;
    }, 0);

    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                totalItems,
                totalPrice,
                openCart,
                setOpenCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
