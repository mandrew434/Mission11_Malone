import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function BuyBooksPage() {
    const navigate = useNavigate();
    const {title, bookId, author, price, category} = useParams();
    const {addToCart} = useCart();

    const handleAddToCart = () =>
    {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title: title || 'No project found',
            price: price ? Number(price) : 0,
            author: author || 'Unknown Author', // Fallback to 'Unknown Author' if author is not provided
            category: category || 'General' // Fallback to 'General' if category is not provided
            ,
            quantity: 1
        }
            addToCart(newItem);
            navigate('/cart');
    }

    return (
        <>
            <WelcomeBand />
            <h2>Purchase {title} by {author}</h2>

            <div>
                <h3>Cost: ${price}</h3>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>
            <button onClick={() => navigate(-1)} >Go Back</button> 
        </>
    )
}

export default BuyBooksPage;