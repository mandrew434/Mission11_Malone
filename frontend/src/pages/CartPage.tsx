import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import CartTable from "../components/CartTable";

function CartPage () {
    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    const totalAmount = cart.reduce((sum,item) => sum + item.price, 0);


    return (
        <div>
            <h2>Your Cart</h2>
            <CartTable cart={cart} removeFromCart={removeFromCart} />
            <h3>Total: <strong>${totalAmount.toFixed(2)}</strong></h3>
            <button>Checkout</button>
            <button onClick={() => navigate('/books')}>Continue Browsing</button>
        </div>
    )
}

export default CartPage;