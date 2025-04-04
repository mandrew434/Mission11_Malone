import { useState, useEffect } from "react";
import { Book } from "../types/Book";
import FlipBookCard from "./FlipBookCard"; // Import the new flip card component
import { fetchBooks } from "../api/BookAPI";
import Pagination from "./Pagination";

// The BookList component fetches and displays a list of books with pagination and sorting.
function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortBy] = useState<string>("Title");
    const [order] = useState<string>("asc");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // useEffect to fetch books when the component mounts or when dependencies change
  useEffect(() => {
    const loadBooks = async () => {
        
      try{
        setLoading(true);
        const data = await fetchBooks(pageSize, pageNum, sortBy, order, selectedCategories);
      


        // Log response to debug
        console.log(data);

        // Set state variables
        setBooks(data.books);
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));

        console.log("Total Num Books:", data.totalNumBooks);
      }
      catch (error) {
        console.error((error as Error).message);
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    // Call fetchBooks function
    loadBooks();
}, [pageNum, pageSize, sortBy, order, selectedCategories]);

  if (loading) return <p>Loading Books</p>
  if (error) return <p className="text-red-500">Error: {error}</p>;

  
  console.log("Total Pages:", totalPages);

  // Return the JSX for the component
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
    <Pagination 
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);}}/>
    </>
    
  );
}

export default BookList;
