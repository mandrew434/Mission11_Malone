
// This file defines the CartItem interface, which represents an item in the shopping cart.
// It includes properties such as bookId, title, author, category, price, and quantity.
export interface CartItem {
    bookId: number;
    title: string;
    author: string;
    category: string;
    price: number;
    quantity: number;
}