import "bootstrap/dist/css/bootstrap.min.css";
import "./FlipBookCard.css"; // Import custom styles
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

function FlipBookCard({ book }: { book: Book }) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-12 mb-4">
      <div className="flip-card">
        <div className="flip-card-inner">
          {/* Front Side */}
          <div className="flip-card-front">
            <h5 className="card-title mt-2">{book.title}</h5>
            <p className="card-text">{book.author}</p>
          </div>

          {/* Back Side */}
          <div className="flip-card-back">
            <h5>{book.title}</h5>
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>Price:</strong> ${book.price.toFixed(2)}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Classification:</strong> {book.classification}</p>
            <p><strong>Page Count:</strong> {book.pageCount}</p>
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(`/buybook/${book.bookId}/${book.title}/${book.author}/${book.price}/${book.category}`)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlipBookCard;
