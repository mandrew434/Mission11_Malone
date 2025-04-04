
// This file defines the Book interface, which represents a book object in the system.
// It includes properties such as bookId, title, author, publisher, isbn, classification, category, pageCount, and price.
export interface Book {
    bookId: number
    title: string
    author: string
    publisher: string
    isbn: string
    classification: string
    category: string
    pageCount: number
    price: number
}