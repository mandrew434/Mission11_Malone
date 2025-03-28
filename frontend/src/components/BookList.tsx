import { useState, useEffect } from "react";
import { Book } from "../types/Book";
import FlipBookCard from "./FlipBookCard"; // Import the new flip card component

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalItems, setTotalItems] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>("Title");
    const [order, setOrder] = useState<string>("asc");

  useEffect(() => {
    const fetchBooks = async () => {

        const categoryParams = selectedCategories.map((cat) => `bookCategory=${encodeURIComponent(cat)}`).join('&');


        const response = await fetch(`https://localhost:5000/Book/AllBooks?pageSize=${pageSize}&pageNum=${pageNum}&sortBy=${sortBy}&order=${order}${selectedCategories.length ? `&${categoryParams}` : ''}`);
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
}, [pageNum, pageSize, sortBy, order, totalItems, selectedCategories]);

  return (
    <>
    <div className="container mt-4">
      <h2>Books for Sale</h2>
      <div className="row">
        {books.map((b) => (
            <FlipBookCard key={b.bookId} book={b} />
        ))}
      </div>
    </div>
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
