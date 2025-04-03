import { Book } from "../types/Book";

interface FetchBookResponse {
    books: Book[];
    totalNumBooks: number;
}

const API_URL = "https://book-malone-backend-cqbrfphzepdqexe2.eastus-01.azurewebsites.net/Book";

export const fetchBooks = async (
    pageSize: number,
    pageNum: number,
    sortBy: string,
    order: string,
    selectedCategories: string[]
): Promise<FetchBookResponse> => {
    try{
        const categoryParams = selectedCategories.map((cat) => `bookCategory=${encodeURIComponent(cat)}`).join('&');
    const response = await fetch(`${API_URL}/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&order=${order}${selectedCategories.length ? `&${categoryParams}` : ''}`);
    
    if (!response.ok) {
        throw new Error("Failed to fetch books");

    }
    return await response.json();
    }
    
    catch (error) {
        console.error("Error fetching books:", error);
        throw error;
    }
    
   
};

export const addBook = async (newBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/AddBook`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newBook),
            });

            if (!response.ok) {
                throw new Error("Failed to add book");
            }

            return await response.json();
        } catch (error) {
        
            console.error("Error adding book:", error);
            throw error;
        }
    };

export const updateBook = async (bookId: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await fetch(`${API_URL}/UpdateBook/${bookId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedBook),
        });

        if (!response.ok) {
            throw new Error("Failed to update book");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating book:", error);
        throw error;
    }
}

export const deleteBook = async (bookId: number): Promise<void> => {
    try {
        const response = await fetch(`${API_URL}/DeleteBook/${bookId}`, {
            method: "DELETE",
        });
        
        if (!response.ok) {
            throw new Error("Failed to delete book");
        }
    } catch (error) {
        console.error("Error deleting book:", error);
        throw error;
    }


}

