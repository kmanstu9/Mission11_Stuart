import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage () {
	const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();


    return (
        <div>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty</p>
                ) : (
                    <ul>
                    {cart.map((item: CartItem) => (
                        <li key={item.bookId}>
                        {item.title}: ${item.price.toFixed(2)}
                        <button onClick={() => removeFromCart(item.price)}>Remove</button>
                        </li>
                    ))}
                    </ul>
                )}
                </div>
  
            <h2>Your Cart</h2>
            <h3>Total:</h3>
            <button >Checkout</button>
            <button onClick={() => navigate("/projects")}>Continue Browsing</button>
        </div>

    )

}

export default CartPage;

