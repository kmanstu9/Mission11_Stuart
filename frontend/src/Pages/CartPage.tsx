import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Optional: Define a "max items" limit to show in the progress bar
  const maxItems = 10;
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const progressPercent = Math.min((itemCount / maxItems) * 100, 100);

  return (
    <div className="container mt-4">
      <h2>Your Cart</h2>

      {/* Bootstrap Progress Bar */}
      <div className="progress mb-3">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progressPercent}%` }}
          aria-valuenow={itemCount}
          aria-valuemin={0}
          aria-valuemax={maxItems}
        >
          {itemCount}/{maxItems} items
        </div>
      </div>

      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul className="list-group mb-3">
            {cart.map((item: CartItem) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={item.bookId}>
                <div>
                  <strong>{item.title}</strong> (x{item.quantity})<br />
                  <small>${item.price.toFixed(2)} each</small><br />
                  <strong>Subtotal:</strong> ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => removeFromCart(item.bookId)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <h3>Total: ${cartTotal.toFixed(2)}</h3>
      <button className="btn btn-success me-2">Checkout</button>
      <button className="btn btn-secondary" onClick={() => navigate('/bookList')}>
        Continue Browsing
      </button>
    </div>
  );
}

export default CartPage;
