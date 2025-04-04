import { useState } from "react"
import { Book } from "../types/Book"
import { updateBook } from "../api/BookAPI";

// This component is used to edit an existing book's details. It takes in the book object, a success callback, and a cancel callback as props.
interface NewBookFormProps {
    book: Book;
    onSuccess: () => void;
    onCancel: () => void;
}

// This function is used to create a form for editing book details. It uses the useState hook to manage form data and handles form submission.
// It also handles input changes and updates the form data accordingly.
const EditBookForm = ({book, onSuccess, onCancel}: NewBookFormProps) => {
    const [formData, setFormData] = useState<Book>({...book});
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value,});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await updateBook(formData.bookId, formData);
        onSuccess();

    };



    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <label>Book Title:<input type="text" name="title" value={formData.title} onChange={handleChange}/></label>
            <label>Author:<input type="text" name="author" value={formData.author} onChange={handleChange}/></label>
            <label>Publisher:<input type="text" name="publisher" value={formData.publisher} onChange={handleChange} /></label>
            <label>ISBN:<input type="text" name="isbn" value={formData.isbn} onChange={handleChange} /></label>
            <label>Classification:<input type="text" name="classification" value={formData.classification} onChange={handleChange} /></label>
            <label>Category:<input type="text" name="category" value={formData.category} onChange={handleChange} /></label>
            <label>Page Count:<input type="number" name="pageCount" value={formData.pageCount} onChange={handleChange} /></label>
            <label>Price:<input type="number" name="price" value={formData.price} onChange={handleChange} /></label>
            <button type="submit">Update Book</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    )
};


export default EditBookForm


