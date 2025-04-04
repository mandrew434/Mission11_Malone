import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BookAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";

// This component is used to manage the admin page for books. It allows the admin to view, add, edit, and delete books.
// It uses the useState and useEffect hooks to manage state and side effects, respectively.
const AdminProjectsPage = () => {
    
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNum, 'Title', 'asc', []);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));

            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        loadBooks();

    }, [pageSize, pageNum]);

    // This function handles the deletion of a book. It prompts the user for confirmation before deleting the book.
    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this book?');
        if (!confirmDelete) return;
        try{
            await deleteBook(bookId);
            setBooks(books.filter((b) => b.bookId !== bookId));
        } catch (err) {
            alert ('Failed to delete book: ' + (err as Error).message);
        }
    }

    //These if statements handle loading and error states. If the data is still loading, it shows a loading message. If there is an error, it shows an error message.
    if (loading) return <p>Loading Books</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div>
            <h1>Admin Books</h1>

            {!showForm && (
                <button 
                    className="btn btn-primary mb-3" 
                    onClick={() => setShowForm(true)}>Add Book</button>
            )}

            {showForm && (
                <NewBookForm onSuccess={() => {
                    setShowForm(false);
                    fetchBooks(pageSize, pageNum, 'Title', 'asc', []).then((data) => setBooks(data.books));
                }}
                onCancel={() => setShowForm(false)} />
            )}

            {editingBook && (
                <EditBookForm book={editingBook} onSuccess={() => {
                    setEditingBook(null);
                    fetchBooks(pageSize, pageNum, 'Title', 'asc', []).then((data) => setBooks(data.books));
                }}
                onCancel={() => setEditingBook(null)} />
            )}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Price</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((b) => (
                        <tr key={b.bookId}>
                            <td>{b.bookId}</td>
                            <td>{b.title}</td>
                            <td>{b.author}</td>
                            <td>{b.publisher}</td>
                            <td>{b.price}</td>
                            <td>{b.isbn}</td>
                            <td>{b.classification}</td>
                            <td>{b.category}</td>
                            <td>{b.pageCount}</td>
                            <td>
                                <button className="btn btn-primary btn-sm w-100 mb-1" onClick={() => setEditingBook(b)}>Edit</button>
                                <button className="btn btn-danger btn-sm w-100 mb-1" onClick={() => handleDelete(b.bookId)}>Delete</button>
                            </td>
                        </tr>
                            
                    ))}
                </tbody>
            </table>
            <Pagination 
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                setPageSize(newSize);
                setPageNum(1);}}/>
        </div>
    )

};



export default AdminProjectsPage;

