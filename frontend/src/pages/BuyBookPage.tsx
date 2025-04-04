import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

// This component is responsible for displaying the purchase page for a specific book. It retrieves the book details from the URL parameters and allows the user to add the book to their cart.
// It uses the useNavigate hook from react-router-dom to navigate back to the previous page or to the cart page after adding the book to the cart.
function BuyBooksPage() {
    const navigate = useNavigate();
    const {title, bookId, author, price, category} = useParams();
    const {addToCart} = useCart();

    //This function handles the addition of the book to the cart. It creates a new CartItem object with the book details and calls the addToCart function from the CartContext. After adding the item to the cart, it navigates to the cart page.
    // It also includes fallback values for title, author, and category in case they are not provided in the URL parameters.
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