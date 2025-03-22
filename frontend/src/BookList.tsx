import { useEffect, useState } from 'react';
import { Book } from './types/Book';

function BookList() {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>("Title");
    const [order, setOrder] = useState<string>("asc");

    // Fetch books from API
    useEffect(() => {
        const fetchBooks = async () => {
            const response = await fetch(`https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&order=${order}`);
            const data = await response.json();

            // Log response to debug
            console.log(data);

            // Set state variables
            setBooks(data.books);
            setTotalItems(data.totalBooks);
            setTotalPages(Math.ceil(data.totalBooks / pageSize));
        };
        // Call fetchBooks function
        fetchBooks();
    }, [pageNum, pageSize, sortBy, order]);

    // Return JSX
    return (
        <>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <label className="me-2">Sort by:</label>
                <select className="form-select w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="Title">Title</option>
                    <option value="Author">Author</option>
                    <option value="Price">Price</option>
                </select>

                <button 
                    className="btn btn-outline-primary mx-2"
                    onClick={() => setOrder(order === "asc" ? "desc" : "asc")}
                >
                    {order === "asc" ? "▲ Asc" : "▼ Desc"}
                </button>
            </div>
            <h2>Books for Sale</h2>
            <br />
            {/* Display books */}
            {books.map((b) => (
                <div className="col-lg-12 mb-4" key={b.bookId}>
                    <div className="card shadow-sm h-100 bg-primary text-white">
                        <div className="card-body">
                            <h4 className="card-title">{b.title}</h4>
                            <ul className="list-unstyled">
                                <li><strong>Author: </strong>{b.author}</li>
                                <li><strong>Publisher: </strong>{b.publisher}</li>
                                <li><strong>ISBN: </strong>{b.isbn}</li>
                                <li><strong>Classification: </strong>{b.classification}</li>
                                <li><strong>Category: </strong>{b.category}</li>
                                <li><strong>Page Count: </strong>{b.pageCount}</li>
                                <li><strong>Price: </strong>${b.price}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
            ))}

<button disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)} >Previous</button>
            
            {/* Display Page Numbers */}
            {
                [...Array(totalPages)].map((_, i) => (
                    <button key={i + 1} onClick={() => setPageNum(i + 1)} disabled={pageNum === (i+1)}>{i + 1}
                    </button>
                ))
            }

            <button disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>Next</button>

            <br />
            <br />
            <label>Results per page</label>
            <select id="resultsPerPage" value={pageSize} onChange={
                (b) => {setPageSize(Number(b.target.value));
                setPageNum(1);
                }
                }>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>  
            </select>

        </>
    );
}

export default BookList;

