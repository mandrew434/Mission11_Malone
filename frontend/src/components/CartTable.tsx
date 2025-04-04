import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { CartItem } from "../types/CartItem";

interface CartTableProps {
  cart: CartItem[];
  removeFromCart: (bookId: number) => void;
}

function CartTable({ cart, removeFromCart }: CartTableProps) {
  const [search, setSearch] = useState("");

  // Filter cart items based on search input
  const filteredCart = cart.filter((b) =>
    b.title.toLowerCase().includes(search.toLowerCase())
  );

  // This component displays the cart items in a table format with a search bar to filter items by title.
  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          marginBottom: "10px",
          padding: "5px",
          width: "100%",
          maxWidth: "300px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      {filteredCart.length === 0 ? (
        <p>No matching books found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCart.map((b) => (
              <tr key={b.bookId}>
                <td>{b.title}</td>
                <td>${b.price.toFixed(2)}</td>
                <td>{b.quantity}</td>
                <td>
                  <button onClick={() => removeFromCart(b.bookId)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CartTable;
