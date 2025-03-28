import { createContext, ReactNode, useContext, useState } from "react";
import { CartItem } from "../types/CartItem";


interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({children} : {children: ReactNode}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {

        setCart((prevCart) => {
            const existingItem = prevCart.find((b) => b.bookId === item.bookId);
            const updatedCart = prevCart.map((b) => b.bookId === item.bookId ? {...b, price: b.price + item.price} : b
        );
            if (existingItem) {
                return prevCart.map(b =>
                    b.bookId === item.bookId
                        ? { ...b, quantity: (b.quantity || 1) + 1, price: b.price + item.price }
                        : b
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];

    });
    };

    const removeFromCart = (bookId: number) => {

        setCart((prevCart) => prevCart.reduce<CartItem[]>((acc, item) => {
                if (item.bookId === bookId) {
                    if (item.quantity > 1) {
                        const unitPrice = item.price / item.quantity;
                        acc.push({ ...item, quantity: item.quantity - 1, price: item.price - unitPrice });
                    }
                    // if quantity is 1, don't add the item (i.e. remove it)
                } else {
                    acc.push(item);
                }
                return acc;
            }, [])
        );
    };

    const clearCart = () => {
        setCart(() => []);
    };

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>

    )

};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
}